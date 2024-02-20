import {RequestContext} from "@mikro-orm/mysql"
import {MikroORM} from "@mikro-orm/core"

import {getConfig} from "./config.js"
import type {IConfig} from "./zod/Config.js"

let cached: Promise<MikroORM>

/**
 * Creates a new Mikro ORM instance with given options, then caches it
 */
export const initOrm = (config: IConfig) => {
  if (!cached) {
    cached = getConfig(config).then(result => MikroORM.init(result))
  }

  return cached
}

/**
 * Returns cached Mikro ORM instance.
 */
export async function getOrm(): Promise<MikroORM> {
  if (!cached) {
    throw new Error(
      "Mikro ORM is not initialized. You need to call initOrm(config) first."
    )
  }

  return cached
}

type RunInContextCallback<TResult> = (orm: MikroORM) => Promise<TResult>

export async function runInContext<TResult>(
  fn: RunInContextCallback<TResult>
): Promise<TResult> {
  const orm = await getOrm()

  return RequestContext.create(orm.em, () => fn(orm))
}

type WithOrmCallback<
  TResult,
  TArgs extends readonly unknown[]
> = (orm: MikroORM, ...args: TArgs) => Promise<TResult>

export const withOrm = <
  TResult,
  TArgs extends readonly unknown[]
>(
  fn: WithOrmCallback<TResult, TArgs>
) => async (...args: TArgs) => runInContext(orm => fn(orm, ...args))

export async function closeConnection(): Promise<void> {
  if (!cached) {
    return
  }

  const orm = await cached
  if (orm && await orm.isConnected()) {
    await orm.close()
  }
}

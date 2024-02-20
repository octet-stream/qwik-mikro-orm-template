import {defineConfig} from "@mikro-orm/mysql"

import * as entities from "../../db/entities.js"

import {Config, type IConfig} from "./zod/Config.js"

export async function getConfig(input: IConfig) {
  const config = await Config.parseAsync(input)

  return defineConfig({
    ...config,

    ensureDatabase: true,
    entities: Object.values(entities)
  })
}

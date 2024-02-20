import type {RequestHandler} from "@builder.io/qwik-city"

import type {IDebug} from "../server/lib/db/zod/Debug.js"
import {initOrm} from "../server/lib/db/orm.js"

/**
 * Initializes Mikro ORM instance on first request
 */
export const onRequest: RequestHandler = async ({env}) => {
  await initOrm({
    debug: env.get("NODE_ENV") as IDebug | undefined,
    dbName: env.get("DB_NAME") as string,
    host: env.get("DB_HOST"),
    port: env.get("DB_PORT"),
    user: env.get("DB_USER"),
    password: env.get("DB_PASSWORD") as string
  })
}

export const onGet: RequestHandler = async ({cacheControl}) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5
  })
}

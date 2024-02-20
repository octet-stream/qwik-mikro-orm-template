import {z} from "zod"

import {NodeEnv} from "../../../zod/common/NodeEnv.js"

export const Debug = NodeEnv
  .default("development")
  .transform(value => ["development", "debug"].includes(value))

export type IDebug = z.input<typeof Debug>

export type ODebug = z.output<typeof Debug>

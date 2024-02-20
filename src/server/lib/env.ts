import {omit} from "lodash-es"
import {loadEnv} from "vite"

import {NodeEnv} from "../zod/common/NodeEnv.js"

// @ts-expect-error This property marked as readonly on type-level at env.d.ts, but we override it anyway to make sure it's set
process.env.NODE_ENV = NodeEnv
  .default("development")
  .parse(process.env.NODE_ENV)

const envs = omit(
  loadEnv(process.env.NODE_ENV, process.cwd(), ""),

  Object.keys(process.env)
)

process.env = {...process.env, ...envs}

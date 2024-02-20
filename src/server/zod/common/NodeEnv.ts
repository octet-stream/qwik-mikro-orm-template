import {z} from "zod"

export const NodeEnv = z.union([
  z.literal("production"),
  z.literal("development"),
  z.literal("test")
])

export type INodeEnv = z.input<typeof NodeEnv>

export type ONodeEnv = z.output<typeof NodeEnv>

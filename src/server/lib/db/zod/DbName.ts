import {z} from "zod"

export const DbName = z
  .string()
  .min(1)
  .max(64)
  .regex(/[a-z0-9$~_-]+/i)

export type IDbName = z.input<typeof DbName>

export type ODbName = z.output<typeof DbName>

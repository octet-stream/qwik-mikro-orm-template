import {z} from "zod"

export const Password = z.string().min(8).max(255)

export type IPassword = z.input<typeof Password>

export type OPassword = z.output<typeof Password>

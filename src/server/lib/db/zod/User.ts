import {z} from "zod"

export const User = z.string().min(3).regex(/^[a-z0-9_-]+$/i).default("root")

export type IUser = z.input<typeof User>

export type OUser = z.output<typeof User>

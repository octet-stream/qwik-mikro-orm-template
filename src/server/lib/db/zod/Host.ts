import {z} from "zod"

// TODO: Add better host validation
export const Host = z.string().min(3).optional()

export type IHost = z.input<typeof Host>

export type OHost = z.output<typeof Host>

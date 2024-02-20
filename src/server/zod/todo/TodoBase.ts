import {z} from "zod"

export const TodoBase = z.object({
  details: z.string().min(1).max(255)
})

export type ITodoBase = z.input<typeof TodoBase>

export type OTodoBase = z.output<typeof TodoBase>

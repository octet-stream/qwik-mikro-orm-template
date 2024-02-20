import {z} from "zod"

export const TodoCompleted = z.boolean()

export type ITodoCompleted = z.input<typeof TodoCompleted>

export type OTodoCompleted = z.output<typeof TodoCompleted>

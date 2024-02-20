import {z} from "zod"

import {TodoCompleted} from "./TodoCompleted.js"
import {TodoBase} from "./TodoBase.js"

export const TodoCreateInput = TodoBase.extend({
  completed: TodoCompleted.default(false)
})

export type ITodoCreateInput = z.input<typeof TodoCreateInput>

export type OTodoCreateInput = z.output<typeof TodoCreateInput>

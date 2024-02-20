import {z} from "zod"

import {Record} from "../common/Record.js"

import {TodoCompleted} from "./TodoCompleted.js"
import {TodoBase} from "./TodoBase.js"

export const TodoOutput = Record.merge(TodoBase).extend({
  completed: TodoCompleted
})

export type ITodoOutput = z.input<typeof TodoOutput>

export type OTodoOutput = z.output<typeof TodoOutput>

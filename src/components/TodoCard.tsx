import {globalAction$, zod$, Form} from "@builder.io/qwik-city"
import {LuTrash2} from "@qwikest/icons/lucide"
import {component$} from "@builder.io/qwik"

import type {OTodoOutput} from "../server/zod/todo/TodoOutput"
import {Node} from "../server/zod/common/Node"
import {withOrm} from "../server/lib/db/orm"
import {Todo} from "../server/db/entities"

import {Card} from "./Card"

interface Props {
  todo: OTodoOutput
}

export const useRemoveTodo = globalAction$(
  withOrm(async (orm, input, {error}) => {
    const todo = await orm.em.findOne(Todo, input.id)

    if (!todo) {
      return error(404, "Todo could not be found")
    }

    await orm.em.removeAndFlush(todo)
  }),

  zod$(Node)
)

export const TodoCard = component$<Props>(({todo}) => {
  const remove = useRemoveTodo()

  return (
    <Card>
      <div class="flex flex-1">{todo.details}</div>

      <Form action={remove}>
        <input type="hidden" name="id" value={todo.id} />

        <button disabled={remove.isRunning}>
          <LuTrash2 />
        </button>
      </Form>
    </Card>
  )
})

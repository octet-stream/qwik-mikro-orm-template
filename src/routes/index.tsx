import {routeLoader$, routeAction$, Form, zod$} from "@builder.io/qwik-city"
import type {DocumentHead} from "@builder.io/qwik-city"
import {LuPlus} from "@qwikest/icons/lucide"
import {component$} from "@builder.io/qwik"
import {serialize} from "@mikro-orm/mysql"

import {Todo} from "../server/db/entities"
import {withOrm} from "../server/lib/db/orm"
import {TodoCreateInput} from "../server/zod/todo/TodoCreateInput"

import {TodoCard} from "../components/TodoCard"
import {Card} from "../components/Card"

export const useGetTodos = routeLoader$(
  withOrm(async orm => serialize(
    await orm.em.find(
      Todo,

      {},

      {
        orderBy: {
          updatedAt: "desc"
        }
      }
    )
  ))
)

export const useCreateTodo = routeAction$(
  withOrm(async (orm, {details, completed}) => {
    const todo = new Todo(details, completed)

    await orm.em.persistAndFlush(todo)

    return serialize(todo)
  }),

  zod$(TodoCreateInput)
)

export const head: DocumentHead = {
  title: "Qwik To-do"
}

const TodoPage = component$(() => {
  const todos = useGetTodos()
  const addTodo = useCreateTodo()

  return (
    <div class="w-full p-5 flex flex-col gap-5 mobile:px-0 mobile:w-mobile mx-auto">
      <div class="text-3xl text-center">To-Do List</div>

      <div class="flex flex-col flex-1 gap-3">
        <Card class="!p-0">
          <Form spaReset action={addTodo} class="flex flex-1 gap-2 w-full">
            <input
              autoFocus
              required
              type="text"
              name="details"
              class="flex flex-1 pl-5 outline-none bg-inherit"
              placeholder="What would you do?"
            />

            <button
              disabled={addTodo.isRunning}
              class="pr-5 py-5"
              type="submit"
            >
              <LuPlus />
            </button>
          </Form>
        </Card>

        <ul class="flex flex-1 flex-col gap-3">
          {todos.value.map(todo => (
            <li key={todo.id}>
              <TodoCard todo={todo} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})

export default TodoPage

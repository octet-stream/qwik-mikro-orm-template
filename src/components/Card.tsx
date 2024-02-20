import {component$, Slot, type ClassList} from "@builder.io/qwik"

interface Props {
  class?: ClassList
}

export const Card = component$<Props>(({class: classList}) => (
  <div class={["flex flex-row flex-1 shadow-md rounded-md p-5 bg-white border-neutral-200 dark:bg-neutral-800", classList]}>
    <Slot />
  </div>
))

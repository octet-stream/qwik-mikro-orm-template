import type {RequestHandler} from "@builder.io/qwik-city"
import {component$, Slot} from "@builder.io/qwik"

export const onGet: RequestHandler = async ({cacheControl}) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5
  })
}

const RootLayout = component$(() => (
  <main class="w-screen h-screen flex select-none">
    <div class="flex flex-1 flex-col">
      <Slot />
    </div>
  </main>
))

export default RootLayout

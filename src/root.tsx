import {component$} from "@builder.io/qwik"
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister
} from "@builder.io/qwik-city"

import "./global.css"

import {Head} from "./head"

/**
 * The root of a QwikCity site always start with the <QwikCityProvider> component,
 * immediately followed by the document's <head> and <body>.
 *
 * Don't remove the `<head>` and `<body>` elements.
 */
export default component$(() => (
  <QwikCityProvider>
    <head>
      <meta charSet="utf-8" />

      <link rel="manifest" href="/manifest.json" />

      <Head />
    </head>

    <body lang="en" class="bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
      <RouterOutlet />

      <ServiceWorkerRegister />
    </body>
  </QwikCityProvider>
))

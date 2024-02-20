import {createServer} from "node:http"

import {createQwikCity} from "@builder.io/qwik-city/middleware/node"

/* eslint-disable import/no-unresolved */
import qwikCityPlan from "@qwik-city-plan"

import {manifest} from "@qwik-client-manifest"
/* eslint-enable import/no-unresolved */

import render from "./entry.ssr"

// Allow for dynamic port
const PORT = parseInt(process.env.PORT || "3000", 10)

// Create the Qwik City express middleware
const {router, notFound, staticFile} = createQwikCity({
  render,
  qwikCityPlan,
  manifest
})

const server = createServer((req, res) => {
  staticFile(req, res, () => {
    router(req, res, () => {
      notFound(req, res, () => {})
    })
  })
})

console.log(`Server starter: http://localhost:${PORT}/`)

server.listen(PORT)

import {nodeServerAdapter} from "@builder.io/qwik-city/adapters/node-server/vite"
import {extendConfig} from "@builder.io/qwik-city/vite"

import baseConfig from "../../vite.config.js"

export default extendConfig(baseConfig, {
  build: {
    ssr: true,
    rollupOptions: {
      input: ["src/entry.node.tsx", "@qwik-city-plan"]
    },
    outDir: "server",
    emptyOutDir: true,
    minify: false
  },
  plugins: [
    nodeServerAdapter()
  ]
})

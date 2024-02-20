import {defineConfig} from "vite"
import {qwikVite} from "@builder.io/qwik/optimizer"
import {qwikCity} from "@builder.io/qwik-city/vite"
import {
  vitePluginTypescriptTransform
} from "vite-plugin-typescript-transform"

import tsconfigPaths from "vite-tsconfig-paths"
import ts from "typescript"

export default defineConfig({
  plugins: [
    // ! A workaround for https://github.com/BuilderIO/qwik/issues/5708
    vitePluginTypescriptTransform({
      enforce: "pre",
      filter: {
        files: {
          include: /.tsx?$/
        }
      },
      tsconfig: {
        override: {
          jsx: ts.JsxEmit.Preserve,
          target: ts.ScriptTarget.ESNext
        }
      }
    }),
    qwikCity({trailingSlash: false}),
    qwikVite(),
    tsconfigPaths()
  ],
  server: {
    headers: {
      "Cache-Control": "public, max-age=0"
    }
  },
  preview: {
    headers: {
      "Cache-Control": "public, max-age=600"
    }
  }
})

import type {Config} from "tailwindcss"

const mobile = "450px"

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      width: {
        mobile
      },
      maxWidth: {
        mobile
      }
    },
    screens: {
      mobile
    }
  }
} satisfies Config

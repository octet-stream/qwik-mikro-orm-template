import "../env.js"

import {getConfig} from "./config.js"

export default getConfig({
  debug: process.env.NODE_ENV,
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
})

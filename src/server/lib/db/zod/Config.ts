import {z} from "zod"

import {Password} from "./Password.js"
import {DbName} from "./DbName.js"
import {Debug} from "./Debug.js"
import {Host} from "./Host.js"
import {Port} from "./Port.js"
import {User} from "./User.js"

export const Config = z.object({
  debug: Debug,
  dbName: DbName,
  host: Host,
  port: Port,
  user: User,
  password: Password
})

export type IConfig = z.input<typeof Config>

export type OConfig = z.output<typeof Config>

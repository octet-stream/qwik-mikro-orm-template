import {Entity, Property, type Opt} from "@mikro-orm/mysql"

import {Record} from "./Record.js"

@Entity()
export class Todo extends Record {
  @Property({type: "varchar"})
  details!: string

  @Property({type: "boolean", default: false})
  completed!: Opt<boolean>

  constructor(details: string, completed = false) {
    super()

    this.details = details
    this.completed = completed
  }
}

import {PrimaryKey} from "@mikro-orm/mysql"

export abstract class Node {
  @PrimaryKey({type: "uuid"})
  id: string = crypto.randomUUID()
}

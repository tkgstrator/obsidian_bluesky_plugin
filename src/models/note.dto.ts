import { v4 as uuidv4 } from 'uuid'

export interface INote {
  id: string
  content: string[]
}

export class Note implements INote {
  id: string
  content: string[]

  constructor(content: string[]) {
    this.id = uuidv4()
    this.content = content
  }
}

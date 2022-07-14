import fetch from 'node-fetch'
import qs from 'qs'

export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export class TodoList {
  readonly basename: string
  private readonly secret: string | undefined

  constructor(options: {
    /**
     This sample API doesn't need a secret, but you can see here how one can be supplied.
     * 
     */
    secret?: string
    /** Specifying basename in the constructor allows for having a different one at the client */
    basename?: string
  }) {
    const { basename, secret } = options
    this.basename = basename ?? 'https://jsonplaceholder.typicode.com'
    this.secret = secret
  }

  all = async (options?: { limit?: number; offset?: number }) => {
    const response = await fetch(this.basename + '/todos?' + qs.stringify(options))
    const json = (await response.json()) as Todo[]
    return json
  }
}

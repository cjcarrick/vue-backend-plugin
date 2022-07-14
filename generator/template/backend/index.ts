import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import cors from 'cors'
import fetch from 'cross-fetch'
import { Todo, TodoList } from '../api/index'

// Init .env

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') })
const { SECRET, NODE_ENV, PORT, PORT_DEV = parseInt(PORT ?? '') + 1 } = process.env
const PROD = NODE_ENV === 'production'

// Init API

const tdl = new TodoList({ secret: SECRET })
const addedTodos: Todo[] = []

// Init server

express()
  .use(cors())
  .use(express.static(path.join(__dirname, '../dist/assets')))

  .get('/api/todos', async (req, res) => {
    const { limit, offset } = req.query

    let json = [...(await tdl.all()), ...addedTodos]
    const offsetNum = parseInt(offset?.toString() ?? '0')
    const limitNum = parseInt(limit?.toString() ?? '0') || json.length

    json = json.slice(offsetNum, offsetNum + limitNum)
    res.send(json)

    console.log(`Sent ${json.length} todo items`)
  })

  .post('/api/new', async (req, res) => {
    const newItem = decodeURIComponent(req.query.title?.toString() || '')
    console.log(`Recieved Todo item "${newItem}"`)
    addedTodos.push({ completed: false, id: new Date().getTime(), title: newItem, userId: 0 })
    res.sendStatus(200)
  })

  .listen(PROD ? PORT : PORT_DEV, () => console.log('Backend running on port', PROD ? PORT : PORT_DEV))

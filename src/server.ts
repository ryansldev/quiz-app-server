import dotenv from 'dotenv'

import cors from 'cors'
import express from 'express'
import { TaskController } from '~controllers/Task.controller'
import { errorHandler } from '~middlewares/errorHandler.middleware'
import { createServer } from 'http'
import { Server } from 'socket.io'

dotenv.config({
  path: '.env.' + process.env.NODE_ENV
})

const taskController = new TaskController()

const app = express()
app.use(cors())

app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  )
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log('Connected')
})

app.use((req, res, next) => {
  req.io = io
  next()
})

app.post('/tasks', taskController.create)
app.get('/tasks', taskController.list)
app.get('/tasks/:id', taskController.find)
app.put('/tasks/:id', taskController.update)
app.delete('/tasks/:id', taskController.delete)

app.use(errorHandler)

server.listen(process.env.PORT, () =>
  console.log(
    [
      'SERVER IS RUNNING',
      'ENV: ' + process.env.NODE_ENV,
      'PORT: ' + process.env.PORT
    ].join('\n')
  )
)

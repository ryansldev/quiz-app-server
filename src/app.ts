import express from 'express'
import 'express-async-errors'
import { errorHandler } from '~middlewares/errorHandler.middleware'
import { router } from '~routes/router'

const app = express()

app.use(express.json())

app.use(router)

app.use(errorHandler)

export { app }

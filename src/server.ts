import dotenv from 'dotenv'

import { app } from './app'
dotenv.config({
  path: '.env.' + process.env.NODE_ENV
})

app.listen(process.env.PORT, () =>
  console.log(
    [
      'SERVER IS RUNNING',
      'ENV: ' + process.env.NODE_ENV,
      'PORT: ' + process.env.PORT
    ].join('\n')
  )
)

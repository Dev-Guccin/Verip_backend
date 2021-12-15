import express from 'express' // 1
import config from './config'

import 'module-alias/register'
import bodyParser from 'body-parser'
import 'reflect-metadata'
import loader from '@src/loader'
import { start } from 'repl'

async function startServer() {
  const app: express.Application = express()

  await loader(app)

  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}!`)
  })
}
startServer()

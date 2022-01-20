import express from 'express' // 1
import config from './config'

import 'module-alias/register'
import bodyParser from 'body-parser'
import 'reflect-metadata'
import loader from './loader'
import { start } from 'repl'

async function startServer() {
  console.log('start server....')
  const app: express.Application = express()

  // loader를 이용하여 서버 mongodb연동과 express설정을 시작한다.
  await loader(app)
  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}!🚀`)
  })
}

console.log(config)
startServer()

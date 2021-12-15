import express from 'express' // 1
import bodyParser from 'body-parser'
import 'reflect-metadata'

const app: express.Application = express()

import api from './api'

app.use(bodyParser.json())

// add router
app.use('/api', api())

app.post(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // 2
    console.log('test')
    console.log(req.body)
    res.send('Hello World!')
  }
)
app.get(
  '/:id/test',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // 2
    console.log('test')
    console.log(req.params)
    console.log(req.query)
    res.send('Hello World!')
  }
)

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})

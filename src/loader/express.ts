// loader/express.js
import * as express from 'express'
import * as bodyParser from 'body-parser'
//import * as cors from 'cors';
import api from '../api'

export default async ({ app }: { app: express.Application }) => {
  app.use(bodyParser.json())

  // add router
  app.use('/api', api())

  app.enable('trust proxy')

  //app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }))

  // ...More middlewares

  // Return the express app
  app.post(
    '/',
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // 2
      console.log('test')
      console.log(req.body)
      res.send('Hello World!')
    }
  )
  app.get(
    '/:id/test',
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // 2
      console.log('test')
      console.log(req.params)
      console.log(req.query)
      res.send('Hello World!')
    }
  )
  return app
}

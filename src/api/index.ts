import { Router } from 'express'
import user from './routes/user'
import auth from './routes/auth'

// guaranteed to get dependencies
export default () => {
  const app = Router()
  user(app)
  auth(app)
  return app
}

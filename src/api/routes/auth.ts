import { Router, Request, Response } from 'express'
import AuthService from '../../services/auth'

const route = Router()

export default (app: Router) => {
  app.use('/auth', route)

  route.post('/signup', async (req: Request, res: Response) => {
    console.log('[+] singup')
    console.log(req.body)
    const AuthServiceInstance = new AuthService()

    AuthServiceInstance.SignUp('test')

    res.json({
      success: true,
    })
  })
}

import { Router, Request, Response } from 'express'
import Container, { Service, Inject } from 'typedi'
import { AuthService } from '@src/services/auth'

const route = Router()

export default (app: Router) => {
  app.use('/auth', route)

  route.post('/signup', async (req: Request, res: Response) => {
    console.log('[+] singup')
    console.log(req.body)
    const id = req.body.id
    const password = req.body.password

    // 컨테이너에서 인스턴스를 뽑아온다.
    const AuthServiceInstance: AuthService = Container.get(AuthService)

    AuthServiceInstance.signUp(id, password)

    res.json({
      success: true,
    })
  })
}

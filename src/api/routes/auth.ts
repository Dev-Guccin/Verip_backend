import { Router, Request, Response } from 'express'
import Container, { Service, Inject } from 'typedi'
import { AuthService } from '@src/services/auth'

const route = Router()

export default async (app: Router) => {
  app.use('/auth', route)

  route.post('/signup', async (req: Request, res: Response) => {
    console.log('[+] singup')
    console.log(req.body)
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password

    // 컨테이너에서 인스턴스를 뽑아온다.
    const AuthServiceInstance: AuthService = Container.get(AuthService)

    // 실행과 동시에 값을 확인한다.
    if (await AuthServiceInstance.signUp(id, email, password)) {
      res.json({
        success: true,
      })
    } else {
      res.json({
        success: false,
      })
    }
  })
}

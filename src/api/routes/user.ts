import { Router, Request, Response } from 'express'
//import middlewares from '../middlewares'
import UserService from '../../services/users'

const route = Router()

export default (app: Router) => {
  app.use('/users', route) //
  route.get('/', async (req: Request, res: Response) => {
    // The actual responsability of the route layer.
    console.log('testest')
    const userDTO = req.body

    // Call to service layer.
    // Abstraction on how to access the data layer and the business logic.
    let UserServiceInstance = new UserService()
    const { user, company } = await UserServiceInstance.Signup(userDTO)

    // Return a response to client.
    return res.json({ user, company })
  })
  route.get('/count', async (req: Request, res: Response) => {
    try {
      const UserServiceInstance = new UserService()
      const count = await UserServiceInstance.getUserCount()
      res.json({
        success: true,
        count: count,
      })
    } catch (e) {
      res.json({
        success: false,
      })
    }
  })
}

import { Router, Request, Response } from 'express'
//import middlewares from '../middlewares'
import UserService from '../../services/users'
const route = Router()

export default (app: Router) => {
  route.get('/test', async (req: Request, res: Response) => {
    // The actual responsability of the route layer.
    const userDTO = req.body

    // Call to service layer.
    // Abstraction on how to access the data layer and the business logic.
    let US = new UserService()
    const { user, company } = await US.Signup(userDTO)

    // Return a response to client.
    return res.json({ user, company })
  })
}

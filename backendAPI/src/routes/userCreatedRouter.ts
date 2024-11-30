import express, { Request, Response, Router } from 'express'
const userCreatedRouter: Router = express.Router()
import User from '../Schemas/user'

userCreatedRouter.post(
  '/clerkusercreated',
  async (req: Request, res: Response): Promise<any> => {
    const { email_address, username } = req.body

    try {
      const newUser = new User({
        username: username,
        email: email_address,
      })

      if (newUser) {
        await newUser.save()

        return res.status(200).json({ message: 'Webhook recebido', user: newUser })
      }
    } catch (error) {
        return res.status(500).json({message:"ServerError"})
    }
  }
)

export default userCreatedRouter

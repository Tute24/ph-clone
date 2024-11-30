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
      console.log('User created')
      await newUser.save()
      console.log('User saved on the DB')
      res.status(200).send('Success!')
    } catch (error) {
      res.status(500).send('Server Error')
    }
  }
)

export default userCreatedRouter

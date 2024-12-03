import express, { Request, Response, Router } from 'express'
const userCreatedRouter: Router = express.Router()
import User from '../Schemas/user'

userCreatedRouter.post(
  '/clerkusercreated',
  async (req: Request, res: Response): Promise<any> => {
    const { data } = req.body

    const username = data.username
    const email_address = data.email_addresses[0]?.email_address
    const clerkId = data.id
    console.log(username,email_address)

    try {
      const newUser = new User({
        username: username,
        email: email_address,
        clerkId: clerkId
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

import express, { Router, Request, Response } from 'express'
const dashRouter: Router = express.Router()

import { getAuth } from '@clerk/express'

dashRouter.get(
  '/dashboard',
  async (req: Request & { user?: any }, res: Response): Promise<any> => {
    console.log('Iniciando requisição')
    try {
      const user = getAuth(req)
      console.log(user)
      res.status(200).json({ message: 'Success!', user: user })
    } catch (error) {
      res.status(500).json({ message: 'Server Error' })
    }
  }
)

export default dashRouter

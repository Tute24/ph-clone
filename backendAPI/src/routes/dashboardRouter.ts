import express, { Router, Request, Response } from 'express'
const dashRouter: Router = express.Router()
import Product from '../Schemas/product'
import { getAuth } from '@clerk/express'

dashRouter.get(
  '/dashboard',
  async (req: Request & { user?: any }, res: Response): Promise<any> => {
    console.log('Iniciando requisição')
    const userId = getAuth(req).userId
    try {
      const usersProducts = await Product.find({createdBy: userId}, "productName description productUrl upVotes tags summDesc")
      res.status(200).json({ message: 'Success!',products: usersProducts})
    } catch (error) {
      res.status(500).json({ message: 'Server Error' })
    }
  }
)

export default dashRouter

import express, { Request, Response, Router } from 'express'
const upVoteRouter: Router = express.Router()
import Product from '../Schemas/product'
import User from '../Schemas/user'
import { getAuth } from '@clerk/express'
import ProductType from '../types/ProductType'
import UserType from '../types/UserType'
import { Document } from 'mongoose'

type ProductDocument = ProductType & Document
type UserDocument = UserType & Document

upVoteRouter.post(
  '/upVote',
  async (req: Request, res: Response): Promise<any> => {
    const { product } = req.body
    const clerkId = getAuth(req).userId
    if (!clerkId) {
      console.log('Theres no clerkId')
      return res.status(401).json({ message: 'Unauthorized' })
    }
    try {
      console.log('Initializing try')
      const upVotedProduct = (await Product.findOne({
        _id: product,
      })) as ProductDocument
      const voterUser = (await User.findOne({ clerkId })) as UserDocument
      if (upVotedProduct) {
        console.log('The product exists')
        if (upVotedProduct.voters.includes(clerkId)) {
          console.log('Already voted')
          return res
            .status(403)
            .json({ message: "You've already upVoted this product." })
        }
        
        if (voterUser && !voterUser.productsVoted.includes(upVotedProduct._id)) {
            console.log('User exists and has not voted on this product yet.')
            voterUser.productsVoted.push(upVotedProduct._id)
            console.log('Product pushed')
            upVotedProduct.upVotes = Number(upVotedProduct.upVotes) + 1
            upVotedProduct.voters.push(clerkId)
            console.log('Pushed')
          await voterUser.save()  
          await upVotedProduct.save()
          console.log(upVotedProduct, 'Success')
          return res.status(200).json({ message: 'Success.' })
        }
      }
    } catch (error) {
      return res.json({ message: 'Server Error' })
    }
  }
)

export default upVoteRouter

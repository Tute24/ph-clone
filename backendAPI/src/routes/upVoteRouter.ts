import express, {Request,Response, Router} from 'express'
const upVoteRouter: Router = express.Router()
import Product from '../Schemas/product'
import { getAuth } from '@clerk/express'
import ProductType from '../types/ProductType'
import { Document } from 'mongoose'

type ProductDocument = ProductType & Document

upVoteRouter.post('/upVote',async(req: Request,res: Response):Promise<any>=>{

    const {product} = req.body
    const clerkId = getAuth(req).userId
    if(!clerkId){
        console.log('Theres no clerkId')
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        console.log('Initializing try')
        const upVotedProduct = await Product.findOne({_id: product}) as ProductDocument
        if(upVotedProduct){
            console.log('The product exists')
            if(upVotedProduct.voters.includes(clerkId)){
                console.log('Already voted')
                return res.status(403).json({message: "You've already upVoted this product."})
            }

            upVotedProduct.upVotes = Number(upVotedProduct.upVotes) +1
            upVotedProduct.voters.push(clerkId)
            console.log('Pushed')
            await upVotedProduct.save()
            console.log(upVotedProduct, 'Success')
            return res.status(200).json({message:"Success."})
        }

    }catch(error){
        return res.json({message:'Server Error'})
    }
})

export default upVoteRouter
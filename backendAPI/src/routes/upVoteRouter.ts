import express, {Request,Response, Router} from 'express'
const upVoteRouter: Router = express.Router()
import Product from '../Schemas/product'


upVoteRouter.post('/upVote',async(req: Request,res: Response):Promise<any>=>{

    const {product} = req.body

    try{
        
        let upVotedProduct = await Product.findOne({_id: product})
        if(upVotedProduct){
            upVotedProduct.upVotes = Number(upVotedProduct.upVotes) +1
            await upVotedProduct.save()
            console.log(upVotedProduct)

            return res.json({message:"Success."})
        }
        

    }catch(error){
        return res.json({message:'Server Error'})
    }
})

export default upVoteRouter
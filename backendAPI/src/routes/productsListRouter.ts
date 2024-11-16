import express, {Request,Response} from 'express'
const productsListRouter = express.Router()
import Product from '../Schemas/product'

productsListRouter.get('/productsList', async (req: Request,res:Response):Promise<any>=>{

    try{
        const usersList: string[] = await Product.find({}, 'productName, description, productUrl, upVotes, tags')
        if(usersList){
            return res.json({message:'Fetched successfully.', users: usersList})
        }
    }catch(error){
        return res.status(500).json({message: 'Error'})
    }
})
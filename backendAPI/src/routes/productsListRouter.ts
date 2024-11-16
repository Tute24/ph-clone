import express, {Request,Response} from 'express'
const productsListRouter = express.Router()
import Product from '../Schemas/product'

productsListRouter.get('/productsList', async (req: Request,res:Response):Promise<any>=>{

    try{
        const productsList: string[] = await Product.find({}, 'productName description productUrl upVotes tags')
        if(productsList){
            return res.json({message:'Fetched successfully.', products: productsList})
        }

    }catch(error){
        return res.status(500).json({message: 'Error'})
    }
})

export default productsListRouter
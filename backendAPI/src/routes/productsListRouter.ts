import express, {Request,Response} from 'express'
const productsListRouter = express.Router()
import Product from '../Schemas/product'

productsListRouter.get('/productsList', async (req: Request,res:Response):Promise<any>=>{
    console.log('Teste1')
    try{
        console.log('Teste 2')
        const productsList: string[] = await Product.find({}, 'productName description productUrl upVotes tags summDesc')
        console.log('Teste 3')
        if(productsList){
            console.log('Teste 4')
            return res.json({message:'Fetched successfully.', products: productsList})
           
        }

    }catch(error){
        return res.status(500).json({message: 'Error desgraça'})
    }
})

export default productsListRouter
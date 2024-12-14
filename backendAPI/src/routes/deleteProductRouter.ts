import express, {Request,Response,Router} from 'express'
const deleteRouter: Router = express.Router()
import Product from '../Schemas/product'

deleteRouter.post('/deleteProduct', async(req:Request,res:Response):Promise<any>=>{
    const {productId} = req.body
    console.log(productId)
    if(productId){
        try{
            await Product.deleteOne({productId})
            console.log("Product deleted")
            return res.status(200).json({message:"Product deleted successfully."})
        }catch(error){
            return res.status(500).json({message: 'Error'})
        }
    }
})

export default deleteRouter
import express, {Request,Response} from 'express'
const getAllRouter = express.Router()
import Product from '../Schemas/product'

getAllRouter.get('/getAll',async(req: Request,res: Response): Promise<any> =>{

    try{
        const database = await Product.find({})

        return res.json({message:"Success", products: database})
    }catch(error){
        return res.status(500).json({message:'Server Error'})
    }

})

export default getAllRouter
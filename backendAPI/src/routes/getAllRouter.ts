import express, {Request,Response} from 'express'
const getAllRouter = express.Router()
import Product from '../Schemas/product'
import { Document } from 'mongoose'
import ProductType from '../types/ProductType'

getAllRouter.post('/getAll',async(req: Request,res: Response): Promise<any> =>{

    const {decoded} = req.body
    if(decoded){
    try{
        const database: (Document & ProductType)[] = await Product.find({},'productName description productUrl upVotes tags summDesc')
        const filteredDatabse = database.filter(product =>(
            product.tags.flatMap(tag => tag.split(/,\s*/)).includes(decoded)
        ))
       
        return res.json({message:"Success", products: filteredDatabse})
    }catch(error){
        return res.status(500).json({message:'Server Error'})
    }
}

})

export default getAllRouter
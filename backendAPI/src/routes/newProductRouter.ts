import express, { Request, Response } from 'express'
const newProductRouter = express.Router()
import Product from '../Schemas/product'
import { AxiosResponse } from 'axios'

newProductRouter.post('/newProduct', async (req: Request, res: Response): Promise<any> =>{
        const {productName, description, productUrl,tags } = req.body

        try{
            const newProduct = new Product({
                productName,
                description,
                productUrl,
                tags
            })
             await newProduct.save()



        }catch(error){
            return res.json({message: 'Error'})
        }

        
})

export default newProductRouter
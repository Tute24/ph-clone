import express, { Request, Response } from 'express'
const newProductRouter = express.Router()
import Product from '../Schemas/product'
import OpenAI from 'openai'
import { getAuth } from '@clerk/express'


newProductRouter.post('/newProduct', async (req: Request, res: Response): Promise<any> =>{
        const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY})
        const {productName, description, productUrl,tags } = req.body
        const clerkId = getAuth(req).userId

        try{

            const response = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    {role: 'system', content: 'Chat, you must summarize the passed text into a 10 to 20 word max description about it, like you were giving a concise explanation to someone about a product, please.'},
                    {role: 'user', content: description}
                ],
                stream: false
            })

            const summDesc = response.choices[0].message.content
            
            console.log(summDesc)

            const newProduct = new Product({
                productName,
                description,
                summDesc,
                productUrl,
                createdBy: clerkId,
                tags
            })
             await newProduct.save()

             return res.json({message: 'Success!'})

        }catch(error){
            return res.status(500).json({message: 'Error'})
        }

        
})

export default newProductRouter
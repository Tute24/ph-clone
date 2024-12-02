import express, { Router, Request,Response } from 'express'
const dashRouter: Router = express.Router()
import Middleware from '../middleware/AuthMiddleware'

dashRouter.get('/dashboard', Middleware, async (req:Request & {user?:any},res:Response): Promise<any> =>{
    console.log("Iniciando requisição")
    try{const user = req.user
    console.log(user)
    res.status(200).json({message:"Success!"})
    }catch(error){
        res.status(500).json({message:"Server Error"})
    }
})

export default dashRouter
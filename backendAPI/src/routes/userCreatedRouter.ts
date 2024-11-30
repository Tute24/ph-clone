import express, {Request,Response,Router} from "express";
const userCreatedRouter: Router = express.Router()
import User from "../Schemas/user";

userCreatedRouter.post('/clerkusercreated', async (req:Request,res:Response)=>{
   console.log(req.body)
   res.status(200).send('Webhook Recebido!')
})

export default userCreatedRouter
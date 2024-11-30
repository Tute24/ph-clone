import express, {Request,Response,Router} from "express";
const userCreatedRouter: Router = express.Router()
import User from "../Schemas/user";

userCreatedRouter.post('/clerkusercreated', async (req:Request,res:Response)=>{
    const {first_name,lastName,username,emailAddress} = req.body

   
    try{
        console.log(first_name)
    }catch(error){
        console.log(error)
    }
})

export default userCreatedRouter
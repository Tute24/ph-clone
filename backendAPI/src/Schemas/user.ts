import mongoose, { Schema } from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema: Schema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    clerkId:{
        type: String,
        required: true,
        unique:true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const User =  mongoose.model('User',userSchema)

export default User
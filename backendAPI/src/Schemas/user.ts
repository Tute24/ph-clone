import mongoose, { Schema } from "mongoose";

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
    productsVoted:{
        type: [String],
        default: []
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const User =  mongoose.model('User',userSchema)

export default User
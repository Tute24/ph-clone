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
    password:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        required: true
    }
})

const User =  mongoose.model('User',userSchema)

module.exports = User
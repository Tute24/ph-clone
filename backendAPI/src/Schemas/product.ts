import mongoose, { Schema } from 'mongoose'

const productSchema: Schema = new mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required:true
    },
    productUrl:{
        type: String,
        required: true
    },
    upVotes:{
        type: Number,
        default:0,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        required: true
    },
    tags:{
        type:[String],
        required:true
    }
})

const Product =  mongoose.model('Product',productSchema)

module.exports = Product
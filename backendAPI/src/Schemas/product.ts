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
    summDesc:{
        type: String,
    },
    productUrl:{
        type: String,
        required: true
    },
    createdBy:{
        type: String,
        required: true
    },
    upVotes:{
        type: Number,
        default:0,
        
    },
    voters: {
        type: [String],
        default: []
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        
    },
    tags:{
        type:[String],
        required:true
    }
})

const Product =  mongoose.model('Product',productSchema)

export default Product
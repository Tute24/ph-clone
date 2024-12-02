const express = require('express')
const app = express()
const mongoose = require('mongoose')
import productRouter from './src/routes/newProductRouter'
import productsList from './src/routes/productsListRouter'
import upVoteRoute from './src/routes/upVoteRouter'
import getAllRoute from './src/routes/getAllRouter'
import userCreatedRoute from './src/routes/userCreatedRouter'
import dashRoute from './src/routes/dashboardRouter'
require('dotenv').config()
const cors = require('cors')
import {clerkMiddleware } from '@clerk/express'
import { Clerk } from '@clerk/clerk-js'

mongoose.connect(process.env.MONGODB_URI)
const pKey = process.env.CLERK_PUBLISHABLE_KEY
if(!pKey){
    throw new Error('Publick Key not provided!')
}
const sKey = process.env.CLERK_SECRET_KEY
if(!sKey){
    throw new Error('Publick Key not provided!')
}
const clerk = new Clerk(pKey)

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware(clerk))
app.use(productRouter)
app.use(productsList)
app.use(upVoteRoute)
app.use(getAllRoute)
app.use(userCreatedRoute)
app.use(dashRoute)


const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Server has been initialized on port ${port}.`)
})


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
import { clerkMiddleware } from '@clerk/express'

mongoose.connect(process.env.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
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


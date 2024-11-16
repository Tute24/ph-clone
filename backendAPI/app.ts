const express = require('express')
const app = express()
const mongoose = require('mongoose')
import productRouter from './src/routes/newProductRouter'
import productsList from './src/routes/productsListRouter'
require('dotenv').config()
const cors = require('cors')

mongoose.connect(process.env.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(productRouter)
app.use(productsList)


const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Server has been initialized on port ${port}.`)
})


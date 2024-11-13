const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI)

app.use(express.json())

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Server has been initialized on port ${port}.`)
})

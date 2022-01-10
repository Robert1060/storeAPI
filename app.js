const express = require('express')
const mongoose = require('mongoose')
// express errors
require('express-async-errors')
const app = express()
require('dotenv').config()
const productsRouters = require('./routes/products')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

// use express
app.use(express.json())


// routes
app.get('/', (req,res) => {
    res.send('<h1>Store API</h1><a href="/api/v2/products">products route</a>')
})
app.use('/api/v2/products', productsRouters)

// midlleware 
app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)



const port = process.env.PORT || 3000

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(port,() => console.log(`Server is listening to the port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()
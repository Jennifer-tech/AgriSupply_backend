const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./src/middlewares/errorMiddleware')
const router = require('./src/routes/indexRoute')
const formData = require("express-form-data")
const app = express()

require('dotenv').config()

// Form type
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(formData.parse())

// Setup Cross-Origin Resource Sharing 
// to enable passing requests through the frontend
app.use(require("cors")()) 

// Route link
app.use('/agriSupply', router)

// Error Handler
app.use(errorHandler)

// Database Connection 
mongoose.connect(process.env.MONGODB_URI_offline, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
})
.then(() => {
    console.log("DB Connected!!")
})
.catch((err) => {
    console.log("There is an issue trying to connect to your database")
})
 
// Import Port from env and connect(listen)
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
})
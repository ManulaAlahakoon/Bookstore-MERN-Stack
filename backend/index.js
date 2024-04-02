//const express = require('express')
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { PORT, mongodbURL } from './config.js'
import { Book } from './models/bookModel.js'
import booksRoute from './routes/bookRoutes.js'


const app = express()
app.use(express.json())
app.use('/books', booksRoute)

//Middleware for handling CORS Policy
//Option 1 - Allow all origins with default of cors
app.use(cors())
//Option 2 - Allow custom origins
/*app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))
*/
const port = process.env.PORT || PORT

app.get('/', (req, res) => {
    console.log(req)
    return  res.status(200).send("Lets learn MERN stack")
})


mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log("Connected to Database")
        app.listen(port, () => {
            console.log(`App is listening to port ${port}`)
        })

    })
    .catch((err) => {
        console.log(err)
    })

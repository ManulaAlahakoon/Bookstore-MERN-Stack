//const express = require('express')
import express from 'express'
import mongoose from 'mongoose'
import { PORT, mongodbURL } from './config.js'
import {Book} from './models/bookModel.js'

const app = express()
app.use(express.json())

const port = process.env.PORT || PORT

app.get('/', (req, res) => {
    console.log(req)
    return  res.status(200).send("Lets learn MERN stack")
})

app.post('/books', async (req,res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear){
            res.status(400).send(
                {message:'Please send all required fields'}
            )
        } 

        const newBook = { 
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newBook)
        res.status(200).send(book) 
        
    } catch (error) { // Errors are not showing as a message
        console.log(error.message)
        return res.status(500).send({message: error.message})
    }
})

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({})
        res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (err) {
        console.log(err.message)
        res.status(400).send({message: err.message})
    }
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

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

app.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        res.status(200).json(book)
    } catch (err) {
        console.log(err)
        res.status(500).send({message: err.message})        
    }    
})

app.put('/books/:id', async (req, res) => {
    try {
        if (
            !req.body.title || !req.body.author || !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields'
            })
        }
        
        const { id } = req.params
        const result = await Book.findByIdAndUpdate(id, req.body)
        res.status(200).json({message:'Book is succesfully updated'})
        
        if (!result) {
            return res.status(404).json({message:'Book not found'})
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
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

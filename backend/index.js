//const express = require('express')
import express from 'express'
import mongoose from 'mongoose'
import {PORT,mongodbURL} from './config.js'

const app = express()

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

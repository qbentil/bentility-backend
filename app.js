import DBCONNECT from './database/index.js';
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

// init dotenv
dotenv.config()

// init app
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// middleware


// run server
const port = process.env.PORT || 3000
app.listen(port, () => {
    DBCONNECT();
  console.log(`Server running on port ${port} 🚀`)
})
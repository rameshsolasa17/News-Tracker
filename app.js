const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')

dotenv.config()

const app = express()

app.get('/', (req, res) => {
    res.send('Home!!')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`.yellow.bold)
})
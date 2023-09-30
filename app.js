const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const path = require('path')
const blogs = require('./blogs')
const connectDB = require('./config/db')
const Blog = require('./models/blogModel')
const blogRoutes = require('./routes/blogRoutes')

dotenv.config()

//data base
connectDB()

const app = express()

//EJS setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//Body Parser Setup
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

//Static files
app.use('/', express.static(path.join(__dirname, 'public'), {maxAge: 10000}))

//Routes
app.use('/', blogRoutes)

//register
app.get('/register', (req, res) => {
    res.render('register')
})

//signin
app.get('/signin', (req, res) => {
    res.render('signin')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`.yellow.bold)
})
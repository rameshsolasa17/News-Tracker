const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const path = require('path')
const blogs = require('./blogs')

dotenv.config()

const app = express()

//EJS setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//Body Parser Setup
app.use(bodyParser.urlencoded({extended:true}))

//Static files
app.use('/', express.static(path.join(__dirname, 'public'), {maxAge: 10000}))

//all Blogs
app.get('/', (req, res) => {
    res.render('home', {blogs: blogs})
})

//one blog
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id
    const blog = blogs.filter((blog) => blog._id == id)
    //res.json(blog[0])
    res.render('blog', {blog: blog[0]})
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`.yellow.bold)
})
//jshint esversion:6

const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const path = require('path')
// const flash = require('connect-flash')
// const session = require('express-session')
// const passport = require('passport')
// require('./config/passport')(passport)


const blogs = require('./blogs')
const connectDB = require('./config/db')
const Blog = require('./models/blogModel')
const blogRoutes = require('./routes/blogRoutes')
const userRoutes = require('./routes/userRoutes')

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

// //Express session
// app.use(session({
//     secret: 'ramesh',
//     resave: true,
//     saveUninitialized: true,
// }))

// //Passport Middleware
// app.use(passport.initialize())
// app.use(passport.session())

// //Connect flash
// app.use(flash())

// //Global Vars
// app.use((req, res, next) => {
//     res.locals.success_msg = req.flash('success_msg')
//     res.locals.error_msg = req.flash('error_msg')
//     res.locals.error = req.flash('error')
//     next()
// })

//Static files
app.use('/', express.static(path.join(__dirname, 'public'), {maxAge: 10000}))

//Routes
app.use('/', blogRoutes)
app.use('/users/', userRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`.yellow.bold)
})

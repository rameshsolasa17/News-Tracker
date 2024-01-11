const mongoose = require('mongoose')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const passport = require('passport')

const getSignIn = async (req, res) => {
    res.render('signin', {isSignIn: false})
}

const getRegister = async (req, res) => {
    res.render('register',{isSignIn: false})
}

const registerUser = async (req, res) => {
    const { name, email, password, password2 } = req.body

    let errors = [];

    if(!name || !email || !password ||!password2) {
        errors.push({msg: 'Please enter all fields'})
    }

    if(password != password2) {
        errors.push({msg: 'Passwords do not match'});
    }

    if(password.length < 6) {
        errors.push({msg: 'Password must be atleast 6 characters'});
    }
    
    if(errors.length > 0) {
        res.render('register', {
            errors, name, email, password, password2
        })
    }
    else {
        const user = await User.findOne({email: email})

        if(user) {
            errors.push({msg: 'Email is already registered'})
            res.render('register', {
                errors, name, email, password, password2
            })
        }
        else {
            const newUser = new User({
                name, 
                email,
                password
            })

            //Hash password
            bcrypt.genSalt(10, (err, salt) => 
                bcrypt.hash(newUser.password, salt, async (err, hash) => {
                    if(err) throw err
                    
                    newUser.password = hash

                    await newUser.save()
                    req.flash('success_msg', 'You are now regsitered and can login')
                    res.redirect('/users/signin')

                })
            )
        }
    }
}

const signInUser = (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/signin',
      failureFlash: true
    })(req, res, next)
}

const signOutUser = (req, res) => {
    req.logout()
    req.flash('success_msg', 'You are logged out')
    res.redirect('/users/signin')
}

module.exports = {
    getSignIn,
    getRegister,
    registerUser,
    signInUser
}
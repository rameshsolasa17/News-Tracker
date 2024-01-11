const mongoose = require('mongoose')
const Blog = require('../models/blogModel')
const path = require('path');
const User = require('../models/userModel');

const getBlogs = async (req, res) => {
    const blogs = await Blog.find() 
    res.render('home', {blogs: blogs})
}

const getBlogById = async (req, res) => {
    const id = req.params.id
    const blog = await Blog.findById(id)
    res.render('blog', {blog: blog})
}

const deleteBlog = async (req, res) => {
    const blog = Blog.find(req.params.id)

    if(blog) {
        await blog.remove()
    } 
    res.redirect('/')
}


const createBlog = async (req, res) => {
    const {title, content, category} = req.body 
    const blog = new Blog({
        title,
        content,
        image: req.file.path.substring(6),
        category
    })

    const createdBlog = await blog.save()
    res.redirect(`/blogs/${createdBlog._id}`)
}

const createBlogComment = async (req, res) => {
    const {comment} = req.body
    const blog = await Blog.findById(req.params.id)

    const newComment = {
        comment,
    }
    blog.comments.push(newComment)

    await blog.save()

    res.redirect(`/blogs/${req.params.id}`)
}


//miscellaneous
const getComposePage = async (req, res) => {
    res.render('compose')
}

module.exports = {
    getBlogs,
    getBlogById,
    getComposePage,
    createBlog,
    deleteBlog,
    createBlogComment
}



/*

CRUD
Create
createBlog

Read
getBlogs
getBlogById

Update


*/
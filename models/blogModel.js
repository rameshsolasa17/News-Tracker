const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
    {
        comment: { 
            type: String, 
            required: true 
        },
    },
    {
        timestamps: true,
    }
)

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
        },
        comments: [commentSchema],
    },
    {
        timestamps: true
    }
)

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
const express = require('express')
const router = express.Router()
const {getBlogs, getBlogById, getComposePage, deleteBlog, createBlog, createBlogComment} = require('../controllers/blogController')
// const {ensureAuthenticated} = require('../config/auth')



//Multer
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/Images/')
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
  
const checkFileType = (file, cb) => {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images only!')
    }
}
  
const upload=multer({
    storage: storage,
        fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
})

router.route('/').get(getBlogs)
router.route('/blogs/:id').get(getBlogById)
router.route('/blogs/:id/comments').post(createBlogComment)
router.route('/compose').get( getComposePage).post(upload.single('image'), createBlog)


module.exports = router
//jshint esversion:6

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const multer = require("multer");


var date = Date.now();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images/');
  },
  filename: (req, file, cb) => {
    //console.log(file);
    date=Date.now();
    cb(null, date+path.extname(file.originalname));
  }
})

const upload=multer({storage: storage});



const homeStartingContent = 'Hello'
const aboutContent = 'Bye'
const contactContent = 'Tata'

const app = express();

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://rameshsolasa2001:rameshsolasa@cluster0.tdxhysz.mongodb.net/?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const postSchema = {
  title: String,
  content: String,
  image: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", upload.single("image"), function(req, res){

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    image: date+path.extname(req.file.originalname)
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});



app.get("/signin", function(req, res){
  res.render("signIn");
});

app.post("/signin", function(req, res) {
  res.redirect("/");
});

app.get("/register", function (req, res) {
  res.render("register");
})

app.post("/register", function(req, res){
  //console.log(req.body);
  res.redirect("/");
})

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content,
      image: post.image
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});



const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`Server started on ${PORT}`));

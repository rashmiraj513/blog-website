const express = require("express")
const ejs = require("ejs")
const _ = require("lodash")
const mongoose = require("mongoose")

const app = express()

app.use(express.urlencoded())
app.use(express.static("public"))
app.set('view engine', 'ejs')

const homeStartingContent = "Welcome to this blog website. Here, you can log the events which happened with you and after some time you can read them! It's like you are maintaining your online diary which can be accessed from anywhere and no need to carry that. It's in your phone and just a click away. This is just your technical diary which can be accessed from any device. So, start blogging your daily events now, so that you can remember your events and some days later you can enjoy those memories or you can at least remember them and be happy and at last WELCOME AGAIN!";
const aboutContent = "This is a blogging website. Here, you can write anything that happened with you at any time with a day stamp and you can access them later. Now, you can write those memories in going in Compose section. Since this website is just one click away from you so that you can access them from anywhere across the globe. So, start writing today from this time. You can write your memories while traveling or doing anything which time you can type something. This website is very user-friendly and has a very simple UI/UX design. The design is so simple even a child can use this. Hence, start blogging your thoughts or ideas or your past today.";
const contactContent = "Since this website is made for only fun purposes. Hence, you can think you are the OWNER of this website. Just keep enjoying and keep blogging your memories so that later time, you can read them, find them, and re-live them.";

// connecting to the mongodb database...
// mongoose.connect("mongodb://localhost:27017/blogWebsite", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb+srv://admin-rashmi:XwLQ7k5k*UkT4ZT@todolist.asvvi.mongodb.net/blogWebsite?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});

// mongoose.connect("mongodb+srv://admin-rashmi:XwLQ7k5k*UkT4ZT@todolist.asvvi.mongodb.net/blogWebsite?retryWrites=true&w=majority")
const postSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Post = mongoose.model("Post", postSchema)

app.get("/", function(req, res) {
    Post.find({}, (err, posts) => {
        if(err) {
            throw err;
        } else {
            res.render("home", {startingContent: homeStartingContent, userPosts: posts})
        }
    });
});

app.post("/compose", function(req, res) {
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });
    post.save((err) => {
        if(err) {
            throw err;
        } else {
            res.redirect("/")
        }
    });
});

app.get("/posts/:postId", function(req, res) {
    const requestedPostId = req.params.postId;
    Post.findOne({_id: requestedPostId}, function(err, post) {
        if(err) {
            throw err;
        } else {
            res.render("post", {title: post.title, content: post.content});
        }
    });
});

app.get("/about", function(req, res) {
    res.render("about", {aboutCont: aboutContent})
})

app.get("/contact", function(req, res) {
    res.render("contact", {contactCont: contactContent})
})

app.get("/compose", function(req, res) {
    res.render("compose")
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is started on port 3000.");
})

// https://sleepy-beach-07889.herokuapp.com/ ----> Heroku web application link for this project.
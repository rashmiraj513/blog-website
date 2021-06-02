const express = require("express")
const ejs = require("ejs")
const _ = require("lodash")
const mongoose = require("mongoose")

const app = express()

app.use(express.urlencoded())
app.use(express.static("public"))
app.set('view engine', 'ejs')

const homeStartingContent = "Welcome to this blog website. Here, you can log the events which happened with you and after sometime you can read them! It's like you are maintaining your online diary which can be accessed from anywhere and no need to carry that. It's in your phone and just a click away. This is just your technical diary which can be accessed from any device. So, start blogging your daily events now and start from here and at last Welcome Again! So that you can remember your events somedays later so that you can enjoy those memories or you can at least remember them and be happy!";
const aboutContent = "This is a blogging website. Here, you can write anything that happened with you at any time with day stamp and you can access them later. Now, you can write those memories in going in compse section and you can write those memories. Since, this website is just one click away from you so that you can access them from anywhere across the globe. So, start writing today and from this time. You can write your memories while travelling or doing anything which time you are able to type something. This website is very user-friendly and very simple UI/UX design. The design is so simple even a child can use this. Hence, starts blogging your dreams today.";
const contactContent = "Since, this website is made for only fun purposes. Hence, you can't contact the owner of this website. You can leave a message so that he can read that and reach out to you if he thinks that is necessary. By the way, this website is made for only intentions of fun, so keep enjoying and keep blogging your memories so that later time, you can read them, find them and re-live them. This website is made with HTML5, CSS3, Bootstrap4, JavaScript, Node.js, Express server, MongoDB database, MongoDB Atlas cloud services and this website is deployed on Heroku services. ";

// connecting to the mongodb database...
mongoose.connect("mongodb://localhost:27017/blogWebsite", {useNewUrlParser: true, useUnifiedTopology: true});

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
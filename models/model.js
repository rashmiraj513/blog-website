const mongoose = require('mongoose');

// posts Schema

const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

// exporting all created schemas

exports.post = postSchema;
require("dotenv").config();
const mongoose = require("mongoose");

// dotenv CONSTANTS...
const password = process.env.PASSWORD;
const db = process.env.DATABASE;
const user = process.env.USER;
const clusterURL = process.env.URL;

const uri = "mongodb://localhost:27017/blogWebsite";

// const uri = "mongodb+srv://" + user + ":" + password + "@" + clusterURL + db + "?retryWrites=true&w=majority";

// connecting to the database...
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

const dbConnection = mongoose.connection;

module.exports = dbConnection;
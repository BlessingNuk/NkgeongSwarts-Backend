const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//app config
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

//1. configure mongo DB
mongoose.connect("mongodb://localhost:27017/nkeongSwartsDB");

//2. db schema
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    Price: Number,
    Quantity: Number
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    Password: String
})

//3. create model
const Product = new mongoose.model("Product", productSchema);
const User = new mongoose.model("User", userSchema);

////////////API routes///////////////////
app.get("/", (req, res) => {
    res.send("Home page");
});

app.get("/login", (req, res) => {
    res.send("login")
});

app.get("/register", (req, res) => {
   res.send("register")
});

app.get("/products", (req, res) => {
    res.send("products")
 });

app.listen(3000, () => {
    console.log("server running on port 3000");
});
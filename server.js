const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//app config
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs')

//1. configure mongo DB
mongoose.connect("mongodb://localhost:27017/nkeongSwartsDB");

//2. db schema
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})


const contactSchema = new mongoose.Schema({
    email: String,
    number: String,
   // address: addrObj
});
//3. create model
const Product = new mongoose.model("Product", productSchema);
const User = new mongoose.model("User", userSchema);
const Contact = new mongoose.model("Contact", contactSchema);

////////////API routes///////////////////

///////////////////////////////////Users////////////////////////////////////
app.route("/users")

.get((req, res) => {
    User.find((err, users) => {
        res.send(users);
    })
})

.post((req, res) => {
    const newUser = new User(req.body);
    newUser.save(err => {
        if (err) {
            res.send(err);
        } else {
            res.send("Added new user");
        }
    });
});

app.route("/users/:email")

.get((req, res) => {
    User.findOne({email: req.params.email}, (err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.send(user);
        }
    })
});
//.patch()
///////////////////////////////////Products////////////////////////////////////
app.route("/products")

.get((req, res) => {
    Product.find((err, products) => {
        res.send(products);
    })
})

.post((req, res) => {
    const newProduct  = new Product(req.body);
    newProduct.save(err => {
        if (err) {
            res.send(eer);
        } else {
            res.send("New product has been added");
        }
    })
});

///////////////////////////////////Contacts////////////////////////////////////
app.route("/contacts")

.get((req, res) => {
    Contact.find((err, contacts) => {
        res.send(contacts);
    })
})

.post((req, res) => {
    const newContact  = new Contact(req.body);
    newContact.save(err => {
        if (err) {
            res.send(eer);
        } else {
            res.send("New Contact has been added");
        }
    })
});


app.listen(4000, () => {
    console.log("server running on port 4000");
});
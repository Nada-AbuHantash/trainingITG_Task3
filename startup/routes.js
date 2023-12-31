const express = require('express');
const error = require('../middleware/error');
const users= require('../routes/users');
const images = require('../routes/images');
const products= require('../routes/products');
const checkout= require('../routes/checkout');
const carts= require('../routes/carts');
const sessions=require('../startup/sessions');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(express.json());
    app.use(sessions);
    app.use(flash());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use('/users', users);
    app.use('/products', products);
    app.use('/images', images);
    app.use('/checkout', checkout);
    app.use('/carts', carts);
    app.use(error);
}
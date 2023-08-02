const express = require('express');
const error = require('../middleware/error');
const users= require('../routes/users')
const sessions=require('../startup/sessions');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(express.json());
    app.use(sessions);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use('/users', users);
    app.use(error);
}
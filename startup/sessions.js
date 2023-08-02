const session = require('express-session');
const{ store }=require('./db');

module.exports=
    session({
        secret: '123', 
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
          maxAge: 3600000 
        }
      });
     

const brcypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/users');
const admin = require('../middleware/admin');
const express = require('express');
const auth =require('../middleware/auth');
const router = express.Router();


router.get('/', async (req, res, resp) => {
    res.render('signup');
});

router.post('/login', async (req, res, resp) => {
 
    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(404).send('the email not found in database');

    const isValid = await brcypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(400).send('invalied  password');

    req.session.useremail = req.body.email;
  
    const token = user.generateAuthToken();
    req.session.auth=token;
    res.send(token); 

});


router.post('/signup', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('the email already exite');
    user = new User(
        _.pick(req.body, ['name', 'email', 'password' ,'phone','isAdmin'])
    );
    const salt = await brcypt.genSalt(10);
    user.password = await brcypt.hash(user.password, salt);
    await user.save();
   
    res.render('login');
  
});

router.get('/logout',[auth,admin],  function (req, res, next)  {
   
    if (req.session.auth) {
          req.session.auth = ' ';
          res.send(" logout ");
    }
    res.send(" logout done");
});
module.exports = router;
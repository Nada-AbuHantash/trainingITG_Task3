const { Order, validate } = require('../models/checkout');
const { User } = require('../models/users');
const { Cart } = require('../models/carts');
const express = require('express');


const router = express.Router();


router.get('/:item/:total', async (req, res, resp) => {
    const userId = req.session.userId;
const item= req.params.item;
const totalprice= req.params.total;
const cartId = req.query.cartIds;
    const user = await User.findById(userId);
    if (!user) return res.status(400).send('Invalid user.');

    res.render('checkout',{user,item,totalprice,cartId});
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  const cart = await Cart.findById(req.body.cartId);
  if (!cart) return res.status(400).send('Invalid cart.');

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send('Invalid user.');

 
    let order = new Order({
      cart: {
        type: [{
        _id: cart._id,
        amount: cart.amount
          }],
        },
      user: {
        _id: user._id,
        email: user.email,
        phone: user.phone,
      },
      paymentway: req.body.paymentway,
      address:req.body.address,
      item: req.body.item,
      totalprice: req.body.totalprice,
    });


    await order.save();
    const id= req.session.userId ;
    req.flash('success', 'Product added to cart successfully!');
    // res.redirect(`/checkout`);
    res.send('done');
 

});

module.exports = router; 
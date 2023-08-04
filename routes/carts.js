const { Cart, validate } = require('../models/carts');
const { User } = require('../models/users');
const { Product } = require('../models/products');
const mongoose = require('mongoose');
const express = require('express');
// const fawn = require('fawn');
const router = express.Router();


// fawn.init(mongoose);
// router.get('/', async (req, res) => {
//   const cart = await Cart.find().sort('-dateOut');
//   res.send(cart);
// });

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  const product = await Product.findById(req.body.productId);
  if (!product) return res.status(400).send('Invalid product.');

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send('Invalid user.');

  const existing = await Cart.findOne({
    'product._id': product._id,
    'user._id': user._id,
  });

  if (!existing) {
    const total = product.price * req.body.amount;

    let cart = new Cart({
      product: {
        _id: product._id,
        name: product.name,
        price: product.price,
        amount: product.amount
      },
      user: {
        _id: user._id,
        email: user.email,
        phone: user.phone
      },
      amount: req.body.amount,
      totalprice: total
    });


    await cart.save();
    res.send(cart);
  }
  else {
    const newAmount= existing.amount + req.body.amount;
    const newPrice = newAmount * product.price ;

    const update = await Cart.updateOne(
      { _id: existing._id },
      { $set: { 'amount': newAmount ,'totalprice': newPrice}}
    );
       
       res.send(update);
       
}
});

router.get('/:id', async (req, res) => {
 
  const cart = await Cart.find({
    'user._id': req.params.id,
  });

  if (!cart) return res.status(404).send('The cart with the given ID was not found.');

  res.send(cart);
});

router.post('/delete', async (req, res) => {
 
  const cart = await Cart.findOneAndDelete(req.body.cartId);

  if (!cart) return res.status(404).send('The cart with the given ID was not found.');

  res.send(cart);
});

module.exports = router; 
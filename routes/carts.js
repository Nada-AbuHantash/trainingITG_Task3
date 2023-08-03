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

//   if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  let cart = new Cart({
    product: {
      _id: product._id,
      name: product.name,
      price: product.price,
      amount:product.amount
    },
    user: {
      _id: user._id,
      email: user.email,
      phone: user.phone
    },
    totalprice:req.body.totalprice
  });
  
//   try {
//     fawn.Task()
//       .save('rentals', rental)
//       .update('movies', { _id: movie._id }, {
//         $inc: {
//           numberInStock: -1
//         }
//       })
//       .run()
//   } catch (err) {
//     res.status(500).send('somthing wrong ...');
//   }

await cart.save();
  res.send(cart);
});

// router.get('/:id', async (req, res) => {
//   const rental = await Rental.findById(req.params.id);

//   if (!rental) return res.status(404).send('The rental with the given ID was not found.');

//   res.send(rental);
// });

module.exports = router; 
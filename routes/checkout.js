const { Order, validate } = require('../models/checkout');
const { User } = require('../models/users');
const { Cart } = require('../models/carts');
const express = require('express');


const router = express.Router();

let message="";
router.get('/:item/:total', async (req, res, resp) => {
  const userId = req.session.userId;
  const item = req.params.item;
  const totalprice = req.params.total;
  
  const user = await User.findById(userId);
  if (!user) return res.status(400).send('Invalid user.');



  res.render('checkout', { user, item, totalprice ,message });
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send('Invalid user.');

  let order = new Order({

    user: {
      _id: user._id,
      email: user.email,
      phone: user.phone,
    },
    paymentway: req.body.paymentway,
    address: req.body.address,
    item: req.body.item,
    totalprice: req.body.totalprice,
  });

  await order.save();
  message='the Order successfully!';
  res.redirect(`/checkout/${ req.body.item}/${req.body.totalprice}`);

});

module.exports = router; 
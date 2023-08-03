const _ = require('lodash');
const { Product, validate } = require('../models/products');
const {Image}=require('../models/images');
const admin = require('../middleware/admin');
const express = require('express');
const auth =require('../middleware/auth');
const router = express.Router();


router.post('/add', [auth,admin],async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const image = await Image.findById(req.body.imageId);
    if (!image) return res.status(400).send('Invalid image.');
  

    let product = new Product(
      {  name: req.body.name,
        shortDescribe: req.body.shortDescribe,
        longDescribe: req.body.longDescribe,
        category: req.body.category,
        price: req.body.price,
        image: req.body.imageId,}
    );
    await product.save();
   
    res.send(
        _.pick(product, ['name', 'shortDescribe','category','price'])
    );
  
});

router.get('/',  async function (req, res, next)  {
   
    const allProduct = await Product.find();
    // const allimage = await Image.find();
    res.status(200).send(allProduct);
});
module.exports = router;
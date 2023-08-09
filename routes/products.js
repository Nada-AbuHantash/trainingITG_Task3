const _ = require('lodash');
const { Product, validate } = require('../models/products');
const { Image } = require('../models/images');
const admin = require('../middleware/admin');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

let message = " ";

router.get('/add', async (req, res, resp) => {
    res.render('addproduct', { message });
});
router.post('/add', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const image = await Image.findById(req.body.imageId);
    if (!image) return res.status(400).send('Invalid image.');


    let product = new Product(
        {
            name: req.body.name,
            shortDescribe: req.body.shortDescribe,
            longDescribe: req.body.longDescribe,
            category: req.body.category,
            price: req.body.price,
            image: req.body.imageId,
        }
    );
    await product.save();
    message = "Done ";
    res.render('addproduct', { message });

});

router.get('/', async function (req, res, next) {

    const allProduct = await Product.find();

    const allimage = await Image
        .find({ _id: { $in: allProduct.map((product) => product.image) } });
    //  const filePaths = allimage.map((image) => image.filePath);
    //  console.log(filePaths);
    //  console.log(  _.pick(allimage, ['uniqueName', 'filePath']));
    // console.log(allimage.filePath);
    const userId = req.session.userId;
    message = req.flash('success');
    const isAdmin=req.session.isAdmin;
    res.render('home', { allProduct, allimage, userId, message ,isAdmin});
});
module.exports = router;
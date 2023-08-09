const _ = require('lodash');
const { Product, validate } = require('../models/products');
const { Image } = require('../models/images');
const upload = require('../middleware/upload');
const validationimage = require('../middleware/validation');
const express = require('express');
const path = require('path');
const router = express.Router();

let message = " ";

router.get('/add', async (req, res, resp) => {
    res.render('addproduct', { message });
});
router.post('/add', [upload.single('file'), validationimage], async (req, res) => {

    const { filename, mimetype, size } = req.file;
    uniqueName = filename;

    const filePath = path.join('C:\\Users\\anas1\\vscode-nodejs\\Task3\\image', filename);

    let image = new Image({

        originalname: req.file.originalname,
        uniqueName: uniqueName,
        filePath: filePath,
        mimetype: mimetype,
        size: size
    });
    await image.save();
    const imageId = image._id.toString(16);

    image = await Image.findById(imageId);
    if (!image) return res.status(400).send('Invalid image.');


    let product = new Product(
        {
            name: req.body.name,
            shortDescribe: req.body.shortDescribe,
            longDescribe: req.body.longDescribe,
            category: req.body.category,
            price: req.body.price,
            image: imageId,
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

    const userId = req.session.userId;
    message = req.flash('success');
    const isAdmin = req.session.isAdmin;
    res.render('home', { allProduct, allimage, userId, message, isAdmin });
});
module.exports = router;
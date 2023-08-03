const Joi = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,

    },
    shortDescribe: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    longDescribe: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    category: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
       
    },
    price: {
        type: Number,
        required: true,
        min: 5,
        max: 5000
      },
      image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
      },
      
    
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {

    const schema = {
         name: Joi.string().min(5).max(50).required(),
         shortDescribe: Joi.string().min(5).max(255).required(),
         longDescribe: Joi.string().min(5).max(1024).required(),
         category: Joi.string().min(5).max(50).required(),
         price: Joi.number().min(5).max(5000).required(),
         imageId: Joi.string().hex().length(24),
    };

    return Joi.validate(product, schema);
}

exports.validate = validateProduct;
exports.Product = Product;
const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);

const cartShcema = new mongoose.Schema({

    totalprice: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        
    },
    product: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50,

            },
            price: {
                type: Number,
                required: true,
                min: 5,
                max: 5000
            },
          
        }),
        required: true
    },
    user: {
        type: new mongoose.Schema({
            email: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255,
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
        }),
        required: true
    },
});

cartShcema.statics.lookup = function (productId, userId) {
    return this.findOne({
        'product._id': productId,
        'user._id': userId
    });
};

function validateCart(cart) {
    const schema = {
        productId: Joi.objectId().required(),
        userId: Joi.objectId().required(),
        amount:Joi.number().required(),

    };

    return Joi.validate(cart, schema);
};
const Cart = mongoose.model('Cart', cartShcema);

exports.cartShcema = cartShcema;
exports.Cart = Cart;
exports.validate = validateCart;

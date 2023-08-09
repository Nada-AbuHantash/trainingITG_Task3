const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);
const { Product } = require('../models/products');

const checkoutShcema = new mongoose.Schema({

    totalprice: {
        type: Number,
        required: true,
    },
    item: {
        type: Number,
        required: true,
        
    },
    cart:
     [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        amount: Number,
       
      }],
       
    
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
    address:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    paymentway:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
});

checkoutShcema.statics.lookup = function (cartId, userId) {
    return this.findOne({
        'cart._id': cartId,
        'user._id': userId
    });
};

function validateOrder(order) {
    const schema = {
        cartId: Joi.objectId().required(),
        userId: Joi.objectId().required(),
        item:Joi.number().required(),
        totalprice:Joi.number().required(),
        address: Joi.string().min(5).max(50).required(),
        paymentway: Joi.string().min(5).max(50).required(),
       

    };

    return Joi.validate(order, schema);
};
const Order = mongoose.model('Order', checkoutShcema);

exports.checkoutShcema = checkoutShcema;
exports.Order = Order;
exports.validate = validateOrder;

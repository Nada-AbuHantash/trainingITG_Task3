const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({

    originalname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    uniqueName: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    filePath: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    size: {
        type: Number,
        max: 500000,
        required: true,

    }

});

const Image = mongoose.model('Image', imageSchema);

exports.imageSchema = imageSchema;
exports.Image = Image;

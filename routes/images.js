const { Image } = require('../models/images');
const upload = require('../middleware/upload');
const validation = require('../middleware/validation');
const express = require('express');
const path = require('path');
const router = express.Router();


router.post('/add', [upload.single('file'),validation] , async (req, res, resp) => {

  const { filename, mimetype, size } = req.file;
  uniqueName = filename;
  
  const filePath = path.join('C:\\Users\\anas1\\vscode-nodejs\\Task3\\image', filename);

  const image = new Image({
   
    originalname: req.file.originalname,
    uniqueName: uniqueName,
    filePath: filePath,
    mimetype: mimetype,
    size: size
  });
  await image.save();

 return res.status(200).send("File uploaded successfully");
  
});


module.exports = router;
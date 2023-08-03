const fs = require('fs');

module.exports=(req,res,next)=>{
    
  if (!req.file) {
    
    return res.status(400).send("No file uploaded");

  }
 
  if (req.file.size > 500000) {
    fs.unlink(req.file.path, (err) => {});
    return res.status(400).send("File size exceeds the limit");

  }
  const array_of_allowed_file_types = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
 

  if (!array_of_allowed_file_types.includes(req.file.mimetype)){
    fs.unlink(req.file.path, (err) => {});

    return res.status(400).send("Invalid file type");

  }
  next();
}
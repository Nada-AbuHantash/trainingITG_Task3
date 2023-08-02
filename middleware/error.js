
module.exports=function(err,req ,res , next){
    console.log('error',err.message );
    
    res.status(500).send('Something failed .');
}
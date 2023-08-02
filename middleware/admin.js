module.exports=function(req,res,next){
    //403 Unauthrized
    //401 Forbidden
    if(!req.user.isAdmin) return res.status(403).send('Access denied .');
    next();
}
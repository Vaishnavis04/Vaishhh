const jwt = require('jsonwebtoken');
const auth=(req,res,next)=>{
    const token=req.header("Authorization").split(" ")[1];
    if(!token){
        return res.status(400).json({error:"No Token,authoriztion denied"});
    }
    try{
        const decoded=jwt.verify(token,"secret_token");
        req.user=decoded;
        next();
    }
    catch{
        res.status(401).json({error:"Token is not valid"});
    }
}
module.exports=auth;
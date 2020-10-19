const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')

module.exports = async(req,res,next)=>{
    // const {authorization} = req.headers
    //authorization === Bearer ewefwegwrherhe
    let token = req.headers["x-access-token"];
    if(!token){
       return res.status(401).json({error:"you must be logged in"})
    }
    // const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
         return   res.status(401).json({error:"unauthorized!"})
        }
        const {uid, username, email} = payload
        req.user = {  uid, username, email, };
          next();       
        
    })
}



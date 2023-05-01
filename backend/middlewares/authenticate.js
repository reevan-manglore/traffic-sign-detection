const jwt = require("jsonwebtoken");


const authenticate = (req,res,next)=>{
    const token = req.header("Auth-Token");
    if(!token){
        return res.status(401).json({error:"please provide valid token"});
    }
    try {
        const userId = jwt.verify(token,process.env.SECRET_KEY);
        req.user  = {id:userId};
        next();
    } catch (error) {
        return res.status(401).json({error:"please provide valid token"});
    }
  
};

module.exports = authenticate;
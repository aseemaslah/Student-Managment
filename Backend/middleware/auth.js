const jwt = require("jsonwebtoken");

exports.auth = (req,res,next)=>{
  const token = req.headers.authorization?.split(" ")[1];
  const data = jwt.verify(token, process.env.JWT_SECRET);
  req.user = data;
  next();
};

exports.allow = (...roles)=>(req,res,next)=>{
  if(!roles.includes(req.user.role))
    return res.status(403).json({message:"Access denied"});
  next();
};

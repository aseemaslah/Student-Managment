const jwt = require("jsonwebtoken");

exports.auth = (req,res,next)=>{
  try {
    console.log('=== AUTH MIDDLEWARE ===');
    console.log('Authorization header:', req.headers.authorization);
    
    const token = req.headers.authorization?.split(" ")[1];
    console.log('Extracted token:', token ? 'Present' : 'Missing');
    
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({message: "No token provided"});
    }
    
    const data = jwt.verify(token, process.env.JWT_SECRET || "secret");
    console.log('Token verified successfully:', data);
    
    req.user = data;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    return res.status(401).json({message: "Invalid token"});
  }
};

exports.allow = (...roles)=>(req,res,next)=>{
  if(!roles.includes(req.user.role))
    return res.status(403).json({message:"Access denied"});
  next();
};

const User = require("../model/User-Model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async(req,res)=>{
  const user = await User.findOne({ username:req.body.username });
  if(!user) return res.status(401).json("Invalid");

  const ok = await bcrypt.compare(req.body.password,user.password);
  if(!ok) return res.status(401).json("Invalid");

  const token = jwt.sign({ id:user._id, role:user.role }, process.env.JWT_SECRET);
  res.json({ token, role:user.role });
};

module.exports = { login };
const User = require("../model/User-Model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    console.log('=== LOGIN REQUEST ===');
    console.log('Request body:', req.body);

    const user = await User.findOne({ username: req.body.username.toUpperCase().trim() });
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(req.body.password, user.password);
    console.log('Password match:', ok);

    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "secret");
    console.log('Token generated successfully');

    const response = {
      token,
      user: {
        _id: user._id,
        username: user.username,
        role: user.role
      }
    };

    console.log('Login response:', response);
    res.json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login };
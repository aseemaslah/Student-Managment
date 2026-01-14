const User = require("../model/User-Model");
const Class = require("../model/Class-Model");
const bcrypt = require("bcryptjs");

const createTeacher = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  await User.create({ ...req.body, password: hash, Role: "Teacher" });
  res.json("Teacher created");
};

const createAdmin = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  await User.create({ ...req.body, password: hash, Role: "Admin" });
  res.json("Admin created");
};

const createClass = async (req, res) => {
  await Class.create(req.body);
  res.json("Class created");
};

module.exports = { createTeacher, createAdmin, createClass };

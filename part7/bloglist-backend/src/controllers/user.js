const express = require("express");

const bcrypt = require("bcrypt");

const User = require("../models/user");

const router = express.Router();

router.post("/users", async (req, res, next) => {
  const body = req.body;
  const saltRounds = 10;
  const password = await bcrypt.hash(body.password, saltRounds);
  const newUser = new User({
    username: body.username,
    name: body.name,
    password,
  });
  await newUser.save();
  return res.status(201).json(newUser);
});

router.get("/users", async (req, res, next) => {
  const users = await User.find({});
  return res.status(200).json(users);
});

router.get("/users/:id", async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id).populate("blogs");
  return res.status(200).json(user);
});

module.exports = router;

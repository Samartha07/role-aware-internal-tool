const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { username, password, role } = req.body;

  const user = await User.create({
    username,
    password,
    role,
  });

  res.json(user);
});

module.exports = router;

console.log("APP FILE LOADED");

const express = require("express");
const bcrypt = require("bcryptjs");
const sequelize = require("./database/sequelize");
const User = require("./models/User");

const app = express();

/* 🔴 VERY IMPORTANT: JSON middleware MUST come before routes */
app.use(express.json());

/* Database sync */
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("DB Error:", err);
  });

/* Test route */
app.get("/", (req, res) => {
  res.send("Server is running");
});

/* 🔍 Simple test POST route */
app.post("/test", (req, res) => {
  res.json({ message: "TEST ROUTE WORKING" });
});

/* ✅ CREATE USER ROUTE */
app.post("/create-user", async (req, res) => {
  console.log("CREATE USER ROUTE HIT");

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User created successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Server start */
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

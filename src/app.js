console.log("APP FILE LOADED");
const AuditLog = require("./models/AuditLog");
const auditMiddleware = require("./middleware/audit");
const roleMiddleware = require("./middleware/role");
const authMiddleware = require("./middleware/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const sequelize = require("./database/sequelize");
const User = require("./models/User");

const app = express();
app.use(express.json());
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

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

/* Simple test POST route */
app.post("/test", (req, res) => {
  res.json({ message: "TEST ROUTE WORKING" });
});

/* CREATE USER ROUTE */
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
  password: hashedPassword,
  role: req.body.role || "user"
  });


    res.status(201).json({
      message: "User created successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
/* LOGIN ROUTE */
app.post("/login", async (req, res) => {
  console.log("LOGIN ROUTE HIT");

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required"
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid email or password"
      });
    }

  const token = jwt.sign(
  {
    userId: user.id,
    role: user.role
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
  );


res.json({
  message: "Login successful",
  token
});

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Something went wrong"
    });
  }
});

app.get(
  "/dashboard",
  authMiddleware,
  auditMiddleware("Viewed Dashboard"),
  (req, res) => {
    res.json({
      message: "Welcome to the protected dashboard",
      user: req.user
    });
  }
);

app.get(
  "/admin",
  authMiddleware,
  roleMiddleware(["admin"]),
  auditMiddleware("Accessed Admin Panel"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
      role: req.user.role
    });
  }
);

app.get(
  "/manager",
  authMiddleware,
  roleMiddleware(["admin", "manager"]),
  auditMiddleware("Accessed Manager Panel"),
  (req, res) => {
    res.json({
      message: "Welcome Manager",
      role: req.user.role
    });
  }
);

app.get(
  "/audit-logs",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    const logs = await AuditLog.findAll({
      order: [["createdAt", "DESC"]]
    });
    res.json(logs);
  }
);



/* Server start */
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

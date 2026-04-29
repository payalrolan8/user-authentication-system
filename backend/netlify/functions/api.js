const serverless = require("serverless-http");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const router = express.Router();

// ── User Schema ──
let UserModel;
const getUserModel = () => {
  if (UserModel) return UserModel;
  const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
  });
  UserModel = mongoose.models.User || mongoose.model("User", userSchema);
  return UserModel;
};

// ── DB Connection Caching ──
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URL);
  isConnected = true;
};

// ── Middleware ──
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Auth Check Route ──
router.get("/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Not logged in" });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.json({ ok: true });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

// ── Signup ──
router.post("/signup", async (req, res) => {
  await connectDB();
  const User = getUserModel();
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.redirect("/signup.html?error=All fields are required");
    if (!validator.isEmail(email))
      return res.redirect("/signup.html?error=Invalid email format");
    if (password.length < 6)
      return res.redirect("/signup.html?error=Password must be at least 6 characters");
    const existing = await User.findOne({ email });
    if (existing)
      return res.redirect("/signup.html?error=Email already registered");
    const hashed = await bcrypt.hash(password, 10);
    await new User({ name, email, password: hashed }).save();
    res.redirect("/login.html?success=Account created! Please login");
  } catch (err) {
    console.error(err);
    res.redirect("/signup.html?error=Something went wrong");
  }
});

// ── Login ──
router.post("/login", async (req, res) => {
  await connectDB();
  const User = getUserModel();
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email))
      return res.redirect("/login.html?error=Invalid email format");
    const user = await User.findOne({ email });
    if (!user)
      return res.redirect("/login.html?error=User not found");
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.redirect("/login.html?error=Invalid credentials");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" });
    res.redirect("/dashboard.html");
  } catch (err) {
    console.error(err);
    res.redirect("/login.html?error=Something went wrong");
  }
});

// ── Logout ──
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login.html");
});

// ── Mount ──
app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
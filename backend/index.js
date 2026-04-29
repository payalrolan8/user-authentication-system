require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const app = express();
const User = require("./User");
const cors = require("cors");
const port = 3000;
const cookieParser = require("cookie-parser");
const path = require("path");
app.use(cors({
  origin: "https://your-netlify-site.netlify.app",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..")));
app.use(cookieParser());
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect("/login.html");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.clearCookie("token");
    res.redirect("/login.html");
  }
};
app.get("/dashboard.html", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/dashboard.html"));
});
app.get("/", (req, res) => {
  res.redirect("/signup.html");
})
main()
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.redirect("/signup.html?error=All fields are required");
    }
    if (!validator.isEmail(email)) {
      return res.redirect("/signup.html?error=Invalid email format");
    }
    if (password.length < 6) {
      return res.redirect("/signup.html?error=Password must be at least 6 characters");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.redirect("/signup.html?error=Email already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.redirect("/login.html?success=Account created! Please login");
  } catch (err) {
    console.log(err);
    res.redirect("signup.html?error=Something went wrong");
  }
})
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      return res.redirect("/login.html?error=Invalid email format");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.redirect("/login.html?error=User not found");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.redirect("/login.html?error=Invalid credentials");
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    res.redirect("https://wonderful-biscochitos-4eeead.netlify.app/dashboard.html");
  } catch (err) {
    console.log(err);
    res.redirect("/login.html?error=Something went wrong");
  }

});
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login.html");
})
app.listen(port, () => {
  console.log(`Server running on ${port}`);
})
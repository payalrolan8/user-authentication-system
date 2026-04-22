require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./User");
const cors = require("cors");
const port = 3000;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("working well");
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
      return res.status(400).json({ message: "all fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email already registered" });
    }
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "Signup successful User registered" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
})
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "login successful", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }

});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
})
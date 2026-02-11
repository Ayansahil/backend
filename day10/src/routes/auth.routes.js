const express = require("express"); // Express framework import kiya backend routes banane ke liye
const authRouter = express.Router(); // Express ka router create kiya auth related routes ke liye
const userModel = require("../models/user.model"); // User ka MongoDB model import kiya (users collection ke liye)
const crypto = require("crypto"); // Node ka crypto module import kiya password hashing ke liye
const jwt = require("jsonwebtoken"); // JWT library import ki token generate karne ke liye

// ================= REGISTER USER API =================
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  // Request body se name, email aur password extract kiya

  const isUserExists = await userModel.findOne({ email });
  // Database me check kiya ki same email ka user pehle se exist karta hai ya nahi

  if (isUserExists) {
    // Agar user already exist karta hai
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const user = await userModel.create({
    name,
    email,
    // Password ko SHA-256 se hash karke database me save kar rahe hain
    password: crypto.createHash("sha256").update(password).digest("hex"),
  });

  const token = jwt.sign(
    {
      id: user._id,
      // JWT payload me user ka unique MongoDB _id store kar rahe hain
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
    // Token 1 hour me expire ho jayega
  );

  res.cookie("token", token);
  // JWT token ko browser cookie me store kar diya (authentication ke liye)

  res.status(201).json({
    message: "User registered successfully",
    user: {
      name: user.name,
      email: user.email,
      // Response me sirf safe user details bhej rahe hain (password nahi)
    },
  });
});

authRouter.get("/get-me", async (req, res) => {
  const token = req.cookies.token; 
  // Cookie se JWT token nikal rahe hain jo login/register ke time store hua tha

  const decoded = jwt.verify(token, process.env.JWT_SECRET); 
  // JWT token verify kar rahe hain aur uska payload (decoded data) le rahe hain

  const user = await userModel.findById(decoded.id); 
  // Decoded token me jo user id thi uske basis par DB se user fetch kar rahe hain

  res.json({
    name: user.name,
    email: user.email,
  });
  // Sirf safe user info response me bhej rahe hain (password nahi)
});


authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body; 
  // Request body se email aur password le rahe hain

  const user = await userModel.findOne({ email }); 
  // DB me check kar rahe hain ki user exist karta hai ya nahi

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
    // Agar email match nahi hua to user not found
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex"); 
  // Entered password ko hash kar rahe hain same algorithm se jo register ke time use hua tha

  const isPasswordValid = hash === user.password; 
  // Hashed password ko DB ke stored password se compare kar rahe hain

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password",
    });
    // Agar password match nahi hua to unauthorized
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  // User id ko payload me daal kar JWT generate kar rahe hain (1 hour expiry)

  res.cookie("token", token); 
  // Generated JWT ko cookie me store kar diya authentication ke liye

  res.json({
    message: "User logged in successfully",
    name: user.name,
    email: user.email,
  });
  // Successful login ke baad basic user info bhej rahe hain
});

module.exports = authRouter;
// Auth router ko export kiya taaki app.js me use ho sake

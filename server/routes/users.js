//importing modules
const express = require("express");
const { signUp, login, verifyEmail } = require("../controllers/users");
const userAuth = require("../middlewares/userAuth");

const router = express.Router();

// passing the middleware function to the signup
router.post("/signup", userAuth.saveUser, signUp);

// login route
router.post("/login", login);

// email verification route
router.get("/verify-email/:id/:token", verifyEmail);

module.exports = router;

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user_model");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    // for hash the password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashpassword,
    });

    // save user
    const user = await newUser.save();
    console.log(user);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("User not found");

    const validPassword=await bcrypt.compare(req.body.password,user.password);
    !validPassword && res.status(400).json("Invalid details");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

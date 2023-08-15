require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    // const match_password=await bcrypt.compare(password,user.password)
    const payload = { _id: user._id };
    const cookie_token = jwt.sign(payload, process.env.SECRET_KEY);
    res.cookie("jwt", cookie_token, {
      secure: true,
      expires: new Date(Date.now() + 10800),
      httpOnly: false,
    });
    if (password == user.password) {
      res.status(200).json({ msg: "Logeed in", cookie_token: cookie_token });
    } else {
      res.status(200).json({ msg: "password not matched" });
    }
  } else {
    res.status(200).json({ msg: "Not User" });
  }
};

module.exports = { loginUser };

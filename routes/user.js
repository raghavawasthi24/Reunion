const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const path = require("path");
const {
  loginUser
} = require("../controllers/user");

router.post("/authenticate",loginUser);

module.exports=router;

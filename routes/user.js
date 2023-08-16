const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const path = require("path");
const {
  loginUser,
  followUser,
  unfollowUser,
  getUser
} = require("../controllers/user");

router.post("/authenticate",loginUser);  
router.post("/follow/:id",followUser); 
router.post("/unfollow/:id",unfollowUser); 
router.post("/user",getUser); 
module.exports=router;

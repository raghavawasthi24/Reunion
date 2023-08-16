const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const path = require("path");
const {
  loginUser,
  followUser,
  unfollowUser,
  getUser,
} = require("../controllers/user");

const {savePost,deletePost,likePost,unlikePost,commentPost} =require("../controllers/posts")

router.post("/authenticate",loginUser);  
router.post("/follow/:id",followUser); 
router.post("/unfollow/:id",unfollowUser); 
router.post("/user",getUser); 

router.post("/posts",savePost); 
router.delete("/posts/:id",deletePost); 
router.post("/like/:id",likePost); 
router.post("/unlike/:id",unlikePost); 
router.post("/comment/:id",commentPost); 
module.exports=router;

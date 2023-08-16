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

const {savePost,deletePost,likePost,unlikePost,commentPost,getPost,getAllPost} =require("../controllers/posts")

router.post("/authenticate",loginUser);  
router.post("/follow/:id",followUser); 
router.post("/unfollow/:id",unfollowUser); 
router.post("/user",getUser); 

router.post("/posts",savePost); 
router.delete("/posts/:id",deletePost); 
router.post("/like/:id",likePost); 
router.post("/unlike/:id",unlikePost); 
router.post("/comment/:id",commentPost); 
router.get("/posts/:id",getPost); 
router.get("/all_posts/:id",getAllPost); 
module.exports=router;

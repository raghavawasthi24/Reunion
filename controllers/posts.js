const express = require("express");
const Posts= require("../models/posts")
const User = require("../models/user")

const savePost = async (req,res)=>{
   const newPost = new Posts(req.body);
   console.log(newPost)
   try{
      const savePost = await newPost.save();
      res.status(200).json({"msg":"post saved successfully","data":savePost})
   }
   catch{
    res.status(404).json({"msg":"failed to post"})
   }
}


const deletePost= async (req,res)=>{
    const post_id= req.params.id;
    try{
        const deletedPost =await Posts.findByIdAndDelete(post_id);
        if(deletePost){
        res.status(200).json({"msg":"Post deleted"})
        }
    }
    catch{
        res.status(500).json({"msg":"Post cant be deleted"})
    }
}

const likePost = async (req,res) => {
    const user_id=req.body.id;
    const post_id = req.params.id;
     
        try{
            const user= await User.findById(user_id)
            const post= await Posts.findById(post_id)
            if(!post.likes.includes(user_id)){
               await post.updateOne({$push: {likes:user_id}})
               res.status(200).json({"msg":"user liked successfully"})
            }
            else{
              return res.status(403).json({"msg":"User already liked"})
            }
        }
        catch{
            res.status(200).json({"msg":"failed"})
        }
     
    }

    const unlikePost = async (req,res) => {
        const user_id=req.body.id;
        const post_id = req.params.id;
         
            try{
                const user= await User.findById(user_id)
                const post= await Posts.findById(post_id)
                if(post.likes.includes(user_id)){
                   await post.updateOne({$pull: {likes:user_id}})
                   res.status(200).json({"msg":"user unliked successfully"})
                }
                else{
                  return res.status(403).json({"msg":"User already unliked"})
                }
            }
            catch{
                res.status(200).json({"msg":"failed"})
            }
         
        }

        const commentPost = async (req,res) => {
            const user_id=req.body.id;
            const comment=req.body.comment;
            const post_id = req.params.id;
             
                try{
                    const user= await User.findById(user_id)
                   if(user){
                        const post= await Posts.findById(post_id)
                       await post.updateOne({$push: {comments:comment}})
                       res.status(200).json({"msg":"user commented successfully"})
                   }
                    
                }
                catch{
                    res.status(200).json({"msg":"failed"})
                }
             
            }


module.exports = {savePost,deletePost,likePost,unlikePost, commentPost}
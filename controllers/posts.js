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

            const getPost= async (req,res)=>{
                const {id} = req.params;
                console.log(id)
                try{
                    const postDetails= await Posts.findById(id)
                    console.log(postDetails)
                    res.status(200).json({"data":{
                        "likes":postDetails.likes.length,
                        "comments":postDetails.comments
                    }})
                }
                catch{
                    res.status(400).json({"msg":"try again"})
                }
            }

            const getAllPost= async (req,res)=>{
                const {id} = req.params;
                console.log(id)
                try{
                    const postDetails= await Posts.find({user_id:id})
                    console.log(postDetails)
                    let arr = [];
                    for(let i=0;i<postDetails.length;i++)
                    {
                       arr.push({
                        "id":postDetails[i]._id,
                        "title":postDetails[i].title,
                        "desc":postDetails[i].desc,
                        "created_at":postDetails[i].createdAt,
                        "likes":postDetails[i].likes.length,
                        "comments":postDetails[i].comments
                       })
                    }
                    res.status(200).json({"msg":"found","data":arr})
                }
                catch{
                    res.status(400).json({"msg":"try again"})
                }
            }


module.exports = {savePost,deletePost,likePost,unlikePost, commentPost,getPost,getAllPost}
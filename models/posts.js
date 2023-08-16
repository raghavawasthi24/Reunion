const mongoose = require("mongoose");

let postSchema = mongoose.Schema({
  user_id:{
    type:String,
    reuired:true,
  },
  title:{
    type:String,
    required:true
  },
  desc:{
    type:String,
    required:true,
  },
  likes:{
    type:Array,
    default:[],
  },
  comments:{
    type:Array,
    default:[],
  }
},{timestamps:true});

module.exports = mongoose.model("Posts", postSchema);

const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: {
    type: Number,
    required: true,
  },
  following: {
    type: Number,
    required: true,
  },
  posts: [
    {
      title: {
        type: String,
        required:true
      },
      description: {
        type: String,
        required: true,
      },
      likes: {
        type: Number,
        required: true,
      },
      dislikes: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);

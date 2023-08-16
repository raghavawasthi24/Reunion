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
      res.status(200).json({ msg: "Logeed in", jwt_token: cookie_token });
    } else {
      res.status(200).json({ msg: "password not matched" });
    }
  } else {
    res.status(200).json({ msg: "Not User" });
  }
};

// const followUser = async (req, res) => {
//     const {id} = req.params;

//   try {
//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Handle the case where the user is found
//     res.json(user);
//   } catch (error) { 
//     console.error(error);
//     res.status(500).json({ message: 'id not found' });
//   }
//   }


  const followUser = async (req,res) => {
    const user_id=req.body.id;
    const userTofollow_id = req.params.id;

        try{
            const user= await User.findById(user_id)
            const userTofollow= await User.findById(userTofollow_id)
            if(!userTofollow.followers.includes(user_id)){
               await user.updateOne({$push: {following:userTofollow_id}})
               await userTofollow.updateOne({$push: {followers:user_id}})
               res.status(200).json({"msg":"user followed successfully"})
            }
            else{
              return res.status(403).json({"msg":"User already followed"})
            }
        }
        catch{
            res.status(200).json({"msg":"failed"})
        }
    }
  





const getUser= async (req,res)=>{
    const {id} = req.body;
    if(id){
        const user = await User.findById(id);
        if(user)
        {
           res.status(200).json({"msg":"user found","data":user});
        }
        else{
            res.status(200).json({"msg":"user not found"});
        }
    }
    else{
        res.status(200).json({"msg":"id not found"});
    }
}

module.exports = { loginUser, followUser, getUser };

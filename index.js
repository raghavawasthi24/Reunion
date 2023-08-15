require("dotenv").config();
const express=require("express");
// const bodyparser=require("body-parser");
const PORT=5000;
const app=express(); 
const cors=require("cors");
require("./config/db.js");  

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())


// app.use("/api",postRouter);
app.use("/api",require("./routes/user.js"));

app.get("/",(req,res)=>{
    res.status(200).json({
        msg:"Hello, Welcome To This Page"
    })
})

app.listen(PORT,()=>{
    console.log("Server is live")
})
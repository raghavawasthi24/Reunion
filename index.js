require("dotenv").config();
const express=require("express");
const bodyparser=require("body-parser");
// const postRouter=require("./routers/postTask.js");
// const getRouter=require("./routers/getTask.js");
const PORT=6000;
const app=express(); 
const cors=require("cors");
require("./config/db.js");  

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))
app.use(cors())


// app.use("/api",postRouter);
// app.use("/api",getRouter);   

app.get("/",(req,res)=>{
    res.status(200).json({
        msg:"Hello, Welcome To This Page"
    })
})

app.listen(PORT,()=>{
    console.log("Server is live")
})
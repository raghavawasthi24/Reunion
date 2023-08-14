const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL,{useNewUrlParser:true}
).then(()=>{
    console.log("success");
}).catch((err)=>{
    console.log(err.message);
}) 
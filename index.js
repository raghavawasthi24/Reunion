const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
app.use(express.json());
connectDB();
app.use("/api/v1", require("./routes/questions"));
// app.use("/api/v2", require("./routes/user"));
// app.use("/api/v3", require("./routes/responses"));
// app.use("/api/v4", require("./routes/feedback"));
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
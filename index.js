const express = require('express');
const app=express();
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute=require("./routes/users");
const authRoute=require("./routes/auth")
const postRoute=require("./routes/posts")

const port=process.env.PORT||8000;

require("./connection");

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);

app.listen(port,()=>{
    console.log(`Website is run on the port ${port}`);
})
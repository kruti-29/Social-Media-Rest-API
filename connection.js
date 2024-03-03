const mongoose = require('mongoose');
const express = require('express');

const ConnectDB=async()=>{
    const Connection=await mongoose.connect(process.env.mongodb_path);
}
ConnectDB().then(console.log("Successfully connected....."))
.catch((err)=>{
    console.log(err);
})
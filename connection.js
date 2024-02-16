const mongoose = require('mongoose');
const express = require('express');

const ConnectDB=async()=>{
    const Connection=await mongoose.connect("mongodb://127.0.0.1:27017/Social-Media-API");
}
ConnectDB().then(console.log("Successfully connected....."))
.catch((err)=>{
    console.log(err);
})
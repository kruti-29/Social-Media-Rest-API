const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId:{
    type:String,
    require:true
  },
  desc:{    
    type:String,
  },
  image:{
    type:String,
  },
  likes:{
    type:Array,
    default:[]
  },
  totalLikes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      userId: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
},{timestamps:true});

const Post = new mongoose.model("Post", PostSchema);

module.exports = Post;
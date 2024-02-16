const router = require("express").Router();
const Post = require("../models/post_model");
const User = require("../models/user_model");

// CREATE A POST
router.post("/",async(req,res)=>{
    const newPost=new Post(req.body)
    try{
        const savedPost=await newPost.save();
        await User.findByIdAndUpdate(req.body.userId, { $inc: { posts: 1 } });
        res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err);
    }
})

// UPDATE A POST
router.put("/:id",async(req,res)=>{
  try {
    const post=await Post.findById(req.params.id)
    if(post.userId===req.body.userId){
        await post.updateOne({$set:req.body});
        res.status(200).json("Post has been updated");
    }else{
     res.status(404).json("You can Upadte only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

// DELETE A POST
router.delete("/:id",async(req,res)=>{
    try {
      const post=await Post.findById(req.params.id);
      if(post.userId===req.body.userId){
          await post.deleteOne({$set:req.body});
          res.status(200).json("Post has been Deleted");
      }else{
       res.status(404).json("You can Delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  })


// LIKE/DISLIKE A POST
router.put("/:id/like", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId }, $inc: { totalLikes: 1 } });
        res.status(200).json("The post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId }, $inc: { totalLikes: -1 } });
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });



// GET A POST
router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  });



// GET TIMELINE POST
router.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err);
  }
});


// ADD COMMENT TO A POST
router.post("/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const newComment = {
      userId: req.body.userId,
      text: req.body.text,
    };
    post.comments.push(newComment);
    await post.save();
    res.status(200).json("Comment added successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});



// GET COMMENTS OF A POST
router.get("/:id/comments", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post.comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

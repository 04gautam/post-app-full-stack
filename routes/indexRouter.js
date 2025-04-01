const express = require("express")
const router = express.Router()
const postModel = require("../models/post-model")
const userModel = require("../models/user-model")
const isLogin = require("../middlewares/isLogin")
const like = require("../models/likes-model")
const isRegister = require("../middlewares/isRegister")



router.get("/",isLogin,async(req, res)=>{
try {
  //   const token =  req.cookies.token
  //   // if(!token){
  //   //   token = "h"
  //   // }

  // const findUser = await userModel.findOne({email:token})

  const findAllPost = await postModel.find().populate("author")
  const {userId} = req.body;
  // .populate("author")

  for (let post of findAllPost) {
    post.likeCount = await like.countDocuments({ post: post._id });

     const present = await like.findOne({post:post._id, user:userId})
     if(!present){
      post.like = "Like"
     }else{
      post.like = "Dislike"
     }
    // console.log(findAllPost)
    // console.log(post.likeCount)
    
  }
//  console.log(findAllPost)
   
  res.render("all-posts.ejs", {findAllPost})
} catch (error) {
  res.send(error.message)
}
})

router.get("/logout", async(req, res)=>{
try {
  res.clearCookie("token")
  res.redirect("/user")

} catch (error) {
  res.send(error.message)
}
})

router.get("/like/:postId",isLogin, async(req, res)=>{
   try{


    const {postId} = req.params
    const {userId} = req.body

    //check if user already liked the post 

    const existingLike = await like.findOne({post:postId, user:userId})

    if(existingLike){
      // return res.status(400).json({message:"Already liked this post"})

      await like.findOneAndDelete({post:postId, user:userId})
      
     return res.redirect("/")

    }

    // add like

    const newLike = new like({post:postId, user:userId})
    await newLike.save()

  
    // const likeCount = await like.countDocuments({post: postId})

    res.redirect("/")


   
   }
   catch(err){
    res.status(500).json({message:"Server error", error:err.message})
   }


})

module.exports = router
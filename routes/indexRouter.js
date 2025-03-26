const express = require("express")
const router = express.Router()
const postModel = require("../models/post-model")

router.get("/", async(req, res)=>{

  const findAllPost = await postModel.find().populate("author")

  // console.log(findAllPost)

  res.render("all-posts.ejs", {findAllPost})
})

module.exports = router
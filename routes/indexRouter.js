const express = require("express")
const router = express.Router()
const postModel = require("../models/post-model")

router.get("/", async(req, res)=>{
try {
  const findAllPost = await postModel.find().populate("author")
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

module.exports = router
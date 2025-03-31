const express = require("express")
const router = express.Router()
const postModel = require("../models/post-model")
const userModel = require("../models/user-model")
const isLogin = require("../middlewares/isLogin")

router.get("/create",isLogin, (req, res)=>{
  try {
    res.render("create-posts")
    
  } catch (error) {
    res.send(error.message)
  }
})

router.post("/createpost", async(req, res)=>{
  try {

    const {title, discription} = req.body;
    // console.log(req.cookies.token)
    const findAuthor = await userModel.findOne({email:req.cookies.token})

    // console.log(findAuthor)
    const createpost = await postModel({
      title,
      discription,
      author: findAuthor._id
    })

    // createpost.author.push()
    // console.log(findAuthor._id)

    await createpost.save()
    res.redirect("/")
    
  } catch (error) {
    res.send(error.message)
  }
})

module.exports = router
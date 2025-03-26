const express = require("express")
const router = express.Router()
const userModel = require("../models/user-model")
const isRegister = require("../middlewares/isRegister")
const isLogin = require("../middlewares/isLogin")
router.get("/user", (req, res)=>{
  res.render("create-user")
})
router.post("/register", (req, res)=>{
try{
   const {name, email, password} = req.body;
  const user = userModel({
    name,
    email,
    password
  })

  user.save()
  res.send("done")
}
 catch(error){
  res.send(error.message)
 }
})

router.get("/login", (req, res)=>{
  try {
     res.render("login.ejs")
  } catch (error) {
    res.send(error.message)
  }

})
router.post("/login",isRegister, (req, res)=>{
  try {
    
     res.cookie("token", req.body.email)

     res.redirect("/")
    // res.send("welcome")

  } catch (error) {
    res.send(error.message)
  }

})


module.exports = router;
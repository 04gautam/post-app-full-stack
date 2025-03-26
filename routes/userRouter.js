const express = require("express")
const router = express.Router()
const userModel = require("../models/user-model")
const isRegister = require("../middlewares/isRegister")
router.get("/user", (req, res)=>{
  res.render("create-user")
})
router.post("/user", (req, res)=>{
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
  } catch (error) {
    res.send(error.message)
  }

})


module.exports = router;
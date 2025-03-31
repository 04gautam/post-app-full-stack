const express = require("express")
const userModel = require("../models/user-model")

module.exports = async function isRegister(req, res, next){
  try {

  const user = await userModel.findOne({email:req.body.email, password:req.body.password})

  if(!user){
    res.render("no-register.ejs")
   
 return;
  }


  // console.log(user)
    
    next()

  } catch (error) {
    res.send(error.message)
  }

}
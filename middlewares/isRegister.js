const express = require("express")
const userModel = require("../models/user-model")

module.exports = async function isRegister(req, res, next){
  try {

  const user = await userModel.findOne({email:req.body.email})

  if(!user){
  return  res.send("no user found in database: ")
  }

  // console.log(user)
    
    next()

  } catch (error) {
    res.send(error.message)
  }

}

const userModel = require("../models/user-model")

module.exports = async function(req, res, next){
const token = req.cookies.token

  const findUser = await userModel.findOne({email:token})
  // console.log(findUser)

 if(token === undefined || !findUser){
    return res.redirect("/user")
  }

  // if(){
  //   return res.redirect("/user")
  // } 

  
  // console.log(token)
  next()
}
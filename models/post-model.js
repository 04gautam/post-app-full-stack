const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  title: String,
  discription: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
})

module.exports = mongoose.model("posts", postSchema)


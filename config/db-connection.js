
const mongoose = require("mongoose")

 mongoose.connect(process.env.MONGO_KEY)
.then(()=>console.log("Database connected successfully"))
.catch((error)=>console.error(error.message))

module.exports = mongoose.connection;
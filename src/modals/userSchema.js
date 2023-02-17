const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email: String,
    displayName: String,
    phone: String,
    role: String
})

const User = mongoose.model("User", userSchema)

module.exports = User;
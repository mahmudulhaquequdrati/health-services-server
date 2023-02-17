const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    id : Number,
    name : String,
    date : String,
    img : String,
    description: Number
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog;
const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    id:Number ,
    description: String ,
    name:String ,
    img:String ,
    address:String ,
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review;
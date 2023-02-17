const Review = require("../modals/reviewSchema");

const getAllReview = async (req,res)=>{
    try {
        const result = await Review.find({});
        res.send(result);
      } catch (error) {
        console.log(error)
      }
};
module.exports ={
    getAllReview
}
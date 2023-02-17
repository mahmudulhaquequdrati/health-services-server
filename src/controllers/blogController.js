const Blog = require("../modals/blogSchema");

const getAllBlogs = async (req,res)=>{
    try {
        const result = await Blog.find({});
        res.send(result);
      } catch (error) {
        console.log(error)
      }
};

module.exports ={
    getAllBlogs
}
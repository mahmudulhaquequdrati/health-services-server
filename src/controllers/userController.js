const User = require("../modals/userSchema");

const getALlPatients = async (req,res) =>{
    try {
        const result = await User.find({});
        res.send(result);
      } catch (error) {
        console.log(error)
      }
}
const getPatientAndAdmin = async (req,res)=>{
    try {
        const email = req.params.email;
        // console.log(email)
        const query = { email: email };
        const user = await User.findOne(query);
        let isAdmin = false;
        if (user?.role === "admin") {
          isAdmin = true;
        }
        res.json({ admin: isAdmin });
      } catch (error) {
        console.log(error)
      }
}
const postPatientOnUser = async (req ,res)=>{
    try {
        const user = req.body;
        const result = await User.create(user);
        res.send(result);
      } catch (error) {
        console.log(error)
      }
}
const deletePatientById = async(req ,res)=>{
    try {
        const id = req.params.id;
        const result = await User.deleteOne({_id : id});
        res.send(result);
      } catch (error) {
        console.log(error)
      }
}
const makeAdminUser = async (req,res)=>{
    try {
        const user = req.body;
        const requester = req.decodedEmail;
        // filtering the requester
        if (requester) {
          const requesterAccount = await User.findOne({ email: requester });
          if (requesterAccount.role === "admin") {
            const filter = { email: user.email };
            const updateDoc = { $set: { role: "admin" } };
            const result = await User.updateOne(filter, updateDoc);
            res.send(result);
          }
        } else {
          res
            .status(403)
            .json({ message: "you do not have access to make someone admin!" });
        }
      } catch (error) {
        console.log(error)
      }
}
module.exports ={
    getALlPatients,
    getPatientAndAdmin,
    postPatientOnUser,
    deletePatientById,
    makeAdminUser
}
const { default: mongoose } = require("mongoose");
const Order = require("../modals/orderSchema");

const getALlUserAppointmentOrders = async (req , res)=>{
    try {
        const result = await Order.find({});
        res.send(result);
      } catch (error) {
        console.log(error.message , error.dir)
      }
}
const getSigleUserAppointmentOrders = async(req,res)=>{
    try {
        const email = req.query.email;
        // console.log(email)
        const userAppointments = await Order.find({"patientEmail": email});
        res.send(userAppointments);
      } catch (error) {
        console.log(error.message , error.dir)
      }
};
const getUserTodayOrdersAppointments = async (req , res)=>{
    try {
        const date = req.query.date;
        // console.log(date)
        const userAppointments = await Order.find({"date": date});
        // console.log(userAppointments)
        res.send(userAppointments);
    } catch (error) {
        console.log(error.message , error.dir)
      }
}
const getAppointmentById = async (req , res)=>{
    try {
        const id = req.params.id;
        const result = await Order.findById({_id : id});
        res.send(result);
      } catch (error) {
        console.log(error.message , error.dir)
      }
}
const getUserappointmentsED = async (req,res)=>{
    try {
        const {email ,date} = req.query
        // console.log(email , date)
        const userSpecificAppointments = await Order.find({ "patientEmail": email , "date" :date });
        
        res.send(userSpecificAppointments);
      } catch (error) {
        console.log(error.message , error.dir)
      }
}
 
const postOrderOnUser = async (req , res)=>{
    try {
        const order = req.body;
        const result = await Order.create(order);
        res.send(result);
      } catch (error) {
        console.log(error.message , error.dir)
      }
};

const deleteUserAppointments = async (req , res)=>{
    try {
        const id = req.params.id;
      
        const result = await Order.findByIdAndDelete({_id :id});
        res.send(result);
      } catch (error) {
        console.log(error.message , error.dir)
      }
    
};

const updateAppointmentById = async (req ,res)=>{
    try {
        const id = req.params.id;
        const payment = req.body;
        const filter = { _id: id };
        const updateDoc = {
          $set: {
            payment: payment,
          },
        };
        const result = await Order.findByIdAndUpdate(filter, updateDoc);
        res.send(result);
      } catch (error) {
        console.log(error.message , error.dir)
      }
}



module.exports ={
    getALlUserAppointmentOrders,
    getSigleUserAppointmentOrders,
    getUserTodayOrdersAppointments,
    getAppointmentById,
    getUserappointmentsED,
    postOrderOnUser,
    deleteUserAppointments,
    updateAppointmentById
}
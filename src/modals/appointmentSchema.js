const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: String,
    time: String,
    space:String,
    price:String
})

const Appointment = mongoose.model("Appointment",appointmentSchema)

module.exports = Appointment;
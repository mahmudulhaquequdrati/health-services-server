const express = require("express");
const Appointment = require("../modals/appointmentSchema");

const getAllAppointments = async (req ,res) =>{
    try{
        const query = await Appointment.find({});
        res.send(query);
      }
    catch (error) {
        console.log(error)
     }
}

module.exports ={
    getAllAppointments
}

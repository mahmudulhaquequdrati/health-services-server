const express = require("express");
const router = express.Router();

const { getAllAppointments } = require("../controllers/appointmentController");


router.get("/", getAllAppointments)

module.exports = router;
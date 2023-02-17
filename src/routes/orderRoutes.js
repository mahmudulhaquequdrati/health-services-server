const express = require("express");
const { getALlUserAppointmentOrders, getSigleUserAppointmentOrders, getUserTodayOrdersAppointments, getAppointmentById, getUserappointmentsED, postOrderOnUser, deleteUserAppointments, updateAppointmentById } = require("../controllers/orderController");
const verifyToken = require("../middleware/verifiedToken");


const router = express.Router();

router.get("/allAppointmentOrders",getALlUserAppointmentOrders)
router.get("/uersAppointmentOrders",getSigleUserAppointmentOrders)
router.get("/todayUserOrder",getUserTodayOrdersAppointments)
router.get("/ed",verifyToken,getUserappointmentsED)
router.get("/:id",getAppointmentById)
router.post("/",postOrderOnUser)
router.delete("/:id",deleteUserAppointments)
router.put("/:id",updateAppointmentById)


module.exports = router;
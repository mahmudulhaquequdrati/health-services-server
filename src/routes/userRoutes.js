const express = require("express");
const { getALlPatients, postPatientOnUser, deletePatientById, makeAdminUser, getPatientAndAdmin } = require("../controllers/userController");
const router = express.Router();

router.get("/patients",getALlPatients)
router.get("/:email",getPatientAndAdmin)
router.post("/patients",postPatientOnUser)
router.delete("/:id",deletePatientById)
router.put("/makeAdmin",makeAdminUser)

module.exports = router;
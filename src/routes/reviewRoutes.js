const express = require("express");
const { getAllReview } = require("../controllers/reviewController");
const router = express.Router();

router.get("/",getAllReview)

module.exports = router;
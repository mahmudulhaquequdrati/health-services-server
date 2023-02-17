const express = require("express");
const { stripeOrderDocuments } = require("../controllers/stripeController");

const router = express.Router();

router.post("/create-payment-intent",stripeOrderDocuments)

module.exports = router;
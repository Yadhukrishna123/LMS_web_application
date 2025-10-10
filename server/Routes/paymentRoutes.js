const express = require("express");
const { createPayment, getAllPayments } = require("../Controllers/paymentController");
const router = express.Router();

router.post("/create", createPayment);
router.get("/all", getAllPayments);

module.exports = router;

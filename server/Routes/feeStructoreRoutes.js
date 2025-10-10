const express = require("express");
const { createFeeSteuctore, getAllFeeStructore, getFeeStructore, deleteFeestructore } = require("../Controllers/feeStructore");
const router = express.Router();

router.post("/create_fee_structore", createFeeSteuctore)
router.get("/get_all_fee_structorre", getAllFeeStructore)
router.route("/get_fee_structore/:id").get(getFeeStructore).delete(deleteFeestructore)

module.exports = router
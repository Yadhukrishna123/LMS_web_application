const express = require("express");
const { createBatch, viewAllBatches } = require("../Controllers/batchesController");
const router = express.Router();

router.post("/create_batch", createBatch);
router.get("/view_all_batches", viewAllBatches);

module.exports = router;

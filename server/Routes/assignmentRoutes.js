const express = require("express");
const { uploadAssignment, getAllAssignments } = require("../Controllers/uploadAssignments");
const router = express.Router();

router.post("/create_assignment", uploadAssignment)
router.get("/get_all_assignments", getAllAssignments)


module.exports = router
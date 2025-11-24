const express = require("express");
const { uploadAssignment } = require("../Controllers/uploadAssignments");
const router = express.Router();

router.post("/create_assignment", uploadAssignment)


module.exports = router
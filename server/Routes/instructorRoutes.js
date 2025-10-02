const express = require("express");
const { addInstructor, viewInstructors } = require("../Controllers/instructorController");
const router = express.Router();

router.post("/add_instructor", addInstructor)

router.get("/view_instructor", viewInstructors)

module.exports = router
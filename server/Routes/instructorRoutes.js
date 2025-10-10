const express = require("express");
const { addInstructor, viewInstructors, } = require("../Controllers/instructorController");
const router = express.Router();

router.post("/add_instructor", addInstructor)

router.get("/view_instructor", viewInstructors)
// router.route("/get_instructor/:id").get(getInstructer).delete(deleteInstructor)

module.exports = router
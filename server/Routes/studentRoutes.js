const express = require("express");
const { addStudent, getAllStudent } = require("../Controllers/studentController");
const router = express.Router();

router.post("/add_student", addStudent)
router.get("/view_students", getAllStudent)



module.exports = router
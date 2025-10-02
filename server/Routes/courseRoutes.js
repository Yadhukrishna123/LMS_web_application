const express = require("express");
const { createCourse, getAllCourse, getCourse } = require("../Controllers/courseController");
const router = express.Router();


router.post("/create_course", createCourse)
router.get("/get_all_courses", getAllCourse)
router.get("/courses/:id", getCourse)

module.exports = router
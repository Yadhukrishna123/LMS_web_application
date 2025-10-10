const express = require("express");
const { createCourse, getAllCourse, getCourse, deleteCourse } = require("../Controllers/courseController");
const router = express.Router();


router.post("/create_course", createCourse)
router.get("/get_all_courses", getAllCourse)
router.route("/get_course/:id").get(getCourse).delete(deleteCourse)

module.exports = router
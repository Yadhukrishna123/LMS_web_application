const express = require("express");
const { createCourse, getAllCourse, getCourse, deleteCourse } = require("../Controllers/courseController");
const { authToken } = require("../middleware/jwtAuth");
const router = express.Router();


router.post("/create_course", createCourse)
// router.get("/get_all_courses", authToken, getAllCourse)
router.route("/get_all_courses").get(authToken, getAllCourse)
router.route("/get_course/:id").get(getCourse).delete(deleteCourse)

module.exports = router
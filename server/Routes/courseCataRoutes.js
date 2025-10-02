const express = require("express");
const { addCourseCatagory, viewAllCourseCatago } = require("../Controllers/courseCatagoryController");
const router = express.Router();

router.post("/add_course_cateogry", addCourseCatagory)
router.post("/view_All_categories", viewAllCourseCatago)


module.exports = router
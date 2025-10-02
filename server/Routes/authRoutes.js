const express = require("express");
const { signup, login, getAllUsers } = require("../Controllers/authController");

const router = express.Router();


router.post("/sign_up", signup)
router.post("/login", login)
router.get("/get_all_user", getAllUsers)





module.exports = router
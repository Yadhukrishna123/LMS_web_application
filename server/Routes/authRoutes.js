const express = require("express");
const { signup, login, getAllUsers, forgotPassword, resetPAssword, getUser, deleteUser } = require("../Controllers/authController");

const router = express.Router();


router.post("/sign_up", signup)
router.post("/login", login)
router.get("/get_all_user", getAllUsers)
router.route("/get_user/:id").get(getUser).delete(deleteUser)
router.post("/forgot_password", forgotPassword)
router.post("/reset_password/:token", resetPAssword)






module.exports = router
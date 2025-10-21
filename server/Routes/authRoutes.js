const express = require("express");
const { signup, login, getAllUsers, forgotPassword, resetPAssword, getUser, deleteUser, getMe, logout } = require("../Controllers/authController");
const { authToken } = require("../middleware/jwtAuth");

const router = express.Router();


router.post("/sign_up", signup)
router.post("/login", login)
router.get("/get_all_user", getAllUsers)
router.route("/get_user/:id").get(getUser).delete(deleteUser)
router.post("/forgot_password", forgotPassword)
router.post("/reset_password/:token", resetPAssword)

router.get("/me", authToken, getMe);
router.post("/logout", logout)




module.exports = router
const express = require("express");
const { authToken } = require("../middleware/jwtAuth");
const router = express.Router();
const {
  createAnnouncement,
  sendLowAttendance,
  getAnnouncements,
  getUserNotifications,
} = require("../Controllers/notificationController");

router.post("/announcementscreate", createAnnouncement);
router.post("/low-attendance", sendLowAttendance);
router.get("/allannouncements", getAnnouncements);
router.get("/usernotifications", authToken,getUserNotifications);


module.exports = router;


const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/jwtAuth");

const {
  createAnnouncement,
  sendLowAttendance,
  getLowAttendanceStudents,
  getAnnouncements,
  getUserNotifications,
  deleteAnnouncement,
  updateAnnouncement,
  markNotificationAsRead,
  deleteUserNotification,
} = require("../Controllers/notificationController");

router.post("/announcementscreate", createAnnouncement);
router.post("/low-attendance", sendLowAttendance);
router.post("/low-attendance-list", getLowAttendanceStudents);
router.get("/allannouncements", getAnnouncements);
router.delete("/announcements/:id", deleteAnnouncement);
router.put("/announcements/:id", updateAnnouncement);

router.get("/usernotifications", authToken, getUserNotifications);
router.patch("/notifications/:id/read", authToken, markNotificationAsRead);
router.delete("/notifications/:id", authToken, deleteUserNotification);

module.exports = router;

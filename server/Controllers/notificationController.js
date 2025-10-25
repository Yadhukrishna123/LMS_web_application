const Notification = require("../modals/Notification");
const Student = require("../modals/students");
const Instructor = require("../modals/instructor");
const Attendance = require("../modals/Attendence");
const jwt = require("jsonwebtoken");
const userModal = require("../modals/users");

//  Send Announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message, recipients } = req.body;

    // Determine recipients
    let users = [];
    if (recipients === "students") users = await Student.find({}, "email");
    else if (recipients === "instructors") users = await Instructor.find({}, "email");
    else users = [
      ...(await Student.find({}, "email")),
      ...(await Instructor.find({}, "email")),
    ];

    const emails = users.map(u => u.email);

    // Save to DB
    const notification = await Notification.create({
      type: "announcement",
      title,
      message,
      recipients: emails,
    });


    res.json({ success: true, notification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";

    const query = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    const totalItems = await Notification.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    const announcements = await Notification.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Add recipientCount dynamically
    const announcementsWithCount = await Promise.all(
  announcements.map(async (ann) => {
    let recipientCount = 0;
    if (ann.recipients === "students") recipientCount = await Student.countDocuments();
    else if (ann.recipients === "instructors") recipientCount = await Instructor.countDocuments();
    else if (ann.recipients === "all") {
      const studentCount = await Student.countDocuments();
      const instructorCount = await Instructor.countDocuments();
      recipientCount = studentCount + instructorCount;
    }
    return { ...ann.toObject(), recipientCount };
  })
);

    res.status(200).json({
      success: true,
      data: announcementsWithCount,
      page,
      totalPages,
      totalItems,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Send Low Attendance Notifications
exports.sendLowAttendance = async (req, res) => {
  try {
    const { message, threshold } = req.body;

    // Fetch all students
    const students = await Student.find({});

    const lowAttendanceStudents = [];

    for (let student of students) {
      // Fetch attendance for this student
      const records = await Attendance.find({ studentId: student._id });
      const total = records.length;
      const presentCount = records.filter(r => r.present).length;
      const percentage = total ? (presentCount / total) * 100 : 0;

      if (percentage < threshold) {
        lowAttendanceStudents.push(student.email); // or student ID if you prefer
      }
    }

    if (!lowAttendanceStudents.length) {
      return res.json({ success: false, message: "No students below threshold" });
    }

    // Save notification to DB
    const notification = await Notification.create({
      type: "low_attendance",
      title: "Low Attendance Alert", // add a default title
      message,
      recipients: lowAttendanceStudents,
    });


    res.json({ success: true, notification, recipients: lowAttendanceStudents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// notificationsController.js

exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const userType = req.user.role; // e.g., 'student' or 'instructor'

    let notifications = [];

    if (userType === "student") {
      // Example: fetch fee, attendance, and announcements
      const fees = await Fee.find({ student: userId, dueDate: { $gte: new Date() } });
      const attendanceAlerts = await Attendance.find({ student: userId, status: "absent" });
      const announcements = await Notification.find({ recipients: userId });

      notifications = [
        ...fees.map(f => ({
          id: f._id,
          type: f.isOverdue ? "urgent" : "warning",
          title: "Fee Due",
          message: `Your fee of $${f.amount} is due on ${new Date(f.dueDate).toLocaleDateString()}`,
          amount: `$${f.amount}`,
          dueDate: new Date(f.dueDate).toLocaleDateString(),
          read: f.read || false,
          timestamp: "Today"
        })),
        ...attendanceAlerts.map(a => ({
          id: a._id,
          type: "info",
          title: "Attendance Alert",
          message: `You missed ${a.subject} class on ${new Date(a.date).toLocaleDateString()}`,
          read: a.read || false,
          timestamp: "Today"
        })),
        ...announcements.map(n => ({
          id: n._id,
          type: "success",
          title: n.title,
          message: n.message,
          read: n.read || false,
          timestamp: new Date(n.createdAt).toLocaleDateString()
        }))
      ];
    } else if (userType === "instructor") {
      // Example: fetch course updates, submissions, etc.
      const announcements = await Notification.find({ recipients: userId });
      notifications = announcements.map(n => ({
        id: n._id,
        type: "info",
        title: n.title,
        message: n.message,
        read: n.read || false,
        timestamp: new Date(n.createdAt).toLocaleDateString()
      }));
    }

    res.json({ success: true, notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

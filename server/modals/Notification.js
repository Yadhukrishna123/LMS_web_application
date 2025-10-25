const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["announcement", "low_attendance"],
    required: true,
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  recipients: {
    type: [String], // 🔹 accept array of emails or roles
    default: [],    // default empty array
  },
  readBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});
const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;

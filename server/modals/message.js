// models/Message.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: false },
  message: { type: String, required: true },
  seen: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);

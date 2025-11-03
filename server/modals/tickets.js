const mongoose = require("mongoose");

// Utility to generate a readable ticket ID
const generateTicketId = () => {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  return `TKT-${timestamp}-${random}`;
};

const ticketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
      unique: true, 
      default: generateTicketId,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: String, enum: ["low", "medium", "high", "urgent"], default: "medium" },
    message: { type: String, required: true },
    attachment: { type: String },
    status: {
      type: String,
      enum: ["open", "in-progress", "solved", "closed"],
      default: "open",
    },
    messages: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }, 
  amount: { type: Number, required: true },
  paymentId: { type: String, required: true },
  status: { type: String, enum: ["success", "failed"], default: "success" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  age: Number,
  gender: String,
  courseEnrolled: String,
  address: String,
  profileImage: String,
  joinedAt: { type: Date, default: Date.now }
});

const studentModel = mongoose.model("student", studentSchema);
module.exports = studentModel;


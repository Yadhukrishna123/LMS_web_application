const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: { type: String, unique: true }, 
  name: String,
  email: String,
  phone: String,
  age: Number,
  gender: String,
  courseEnrolled: String,
  address: String,
  profileImage: String,
  status: { type: String, default: "Active" }, 
  joinedAt: { type: Date, default: Date.now }
});

const studentModel = mongoose.model("student", studentSchema);
module.exports = studentModel;

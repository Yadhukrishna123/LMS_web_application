const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: String,
  type: String, // Video / Document / Live / Quiz
  resource: String,
  duration: String,
  accessType: { type: String, default: "Paid" }, // Free / Paid
});

const moduleSchema = new mongoose.Schema({
  name: String,
  lessons: [lessonSchema],
});

const instructorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  image: String,
  linkedin: String,
  twitter: String,
  facebook: String,
});

const courseSchema = new mongoose.Schema({
  // Section A
  title: { type: String, required: true },
  description: { type: String, required: true },
  overview: String,
  category: String,
  level: String,
  image: [String], // allow multiple images
  price: { type: Number, required: true },
  duration: String,
  tags: [String],
  isFree: { type: Boolean, default: false },

  // Section B
  modules: [moduleSchema],

  // Section C
  instructorDetails: instructorSchema,

  // Section D
  media: {
    images: [String],
    docs: [String],
    trailer: String,
  },

  // Section E
  pricing: {
    discount: Number,
    currency: { type: String, default: "USD" },
    paymentType: { type: String, enum: ["Free", "Paid"], default: "Paid" },
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;

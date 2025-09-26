const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  duration: String,
  level: String,
  instructor: String,
  category: String,
  image: [String],

});

const course = mongoose.model("course", courseSchema)

module.exports = course
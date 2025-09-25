const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
  title:  String, 
  desc:  String, 
  price:  Number, 
  duration:  String,
  level:  String ,
  instructor:  String,
  tags:String,
  image: [String],
  rating:  Number, 
  totalReviews:  Number, 
});

const course = mongoose.model("course", courseSchema)

module.exports = course
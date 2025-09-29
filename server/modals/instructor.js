const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  name:String,
  email:String,
  phone:String ,
  bio:String,
  image:String,
  specialization:String ,
  experience:Number , 
  qualification:String ,
  linkedin:String ,
  github:String ,
  website:String 
});

const instructorModel = mongoose.model("Instructor", instructorSchema);
module.exports = instructorModel;
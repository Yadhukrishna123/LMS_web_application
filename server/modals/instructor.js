const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  instructorId: { 
    type: String, 
    unique: true 
  }, 
  accountRegisteredEmail: { 
    type: String, 
    unique: true,
    sparse: true  
  },
  name: String,
  email: String,
  phone: String,
  bio: String,
  image: String,
  expertise: String,
  specialization: String,
  experience: Number,
  qualification: String,
  linkedin: String,
  github: String,
  website: String
}, {
  timestamps: true
});

const instructorModel = mongoose.model("Instructor", instructorSchema);
module.exports = instructorModel;
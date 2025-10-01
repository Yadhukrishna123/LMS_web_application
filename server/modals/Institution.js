const mongoose = require("mongoose")

const institutionSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    password: String,
    address: String,
   


});

const adminModal = mongoose.model("institutio", institutionSchema)

module.exports = adminModal
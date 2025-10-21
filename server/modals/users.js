const mongoose = require("mongoose")

const userScheme = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    password: String,
    role: String,
    isLogin: {
        type: Boolean,
        default: false,
    },


});

const userModal = mongoose.model("users", userScheme)

module.exports = userModal
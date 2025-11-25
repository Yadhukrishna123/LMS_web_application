const mongoose = require("mongoose");

const assignmentModal = new mongoose.Schema({

    courseId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    deadline: {
        type: String,
        required: true,
    },
    maxMarks: {
        type: String,
        required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

});

const assignments = mongoose.model("assignments", assignmentModal);
module.exports = assignments;
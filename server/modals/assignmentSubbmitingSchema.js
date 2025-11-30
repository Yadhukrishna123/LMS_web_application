const mongoose = require("mongoose");

const assignmentSubbmitinSchema = new mongoose.Schema({
    assignmentName: {
        type: String,
        required: true,
    },
    assignmentFile: {
        type: String,   
        required: true
    },
    comment: {
        type: String,
        default: ""
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
})

const submitAssignments = mongoose.model("Submitted_assignment", assignmentSubbmitinSchema);
module.exports = submitAssignments;
// modals/users.js
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
    
    // ✅ NEW: Instructor Approval Fields
    isApproved: {
        type: Boolean,
        default: function() {
            return this.role === 'student'; // Auto-approve students, instructors need approval
        }
    },
    verificationStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: function() {
            return this.role === 'instructor' ? 'pending' : 'approved';
        }
    },
    rejectionReason: String,
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    approvedAt: Date,
    
    expertise: String,
    
});

const userModal = mongoose.model("users", userScheme)
module.exports = userModal
const mongoose = require("mongoose");

const studentFeeSchema = new mongoose.Schema(
    {
        studentName: {
            type: String,
            required: true,

        },
        courseName: {
            type: String,
            required: true,

        },
        batch: {
            type: String,

        },
        totalFee: {
            type: Number,
            required: true,

        },
        amountPaid: {
            type: Number,
            required: true,

        },
        balance: {
            type: Number,
            default: function () {
                return this.totalFee - this.amountPaid;
            },
        },
        modeOfPayment: {
            type: String,
            required: true,
        },
        paymentDate: {
            type: Date,
            required: true,
        },
        remarks: {
            type: String,

        },
        receiptNo: {
            type: String,
            unique: true,
        },
    },

);

studentFeeSchema.pre("save", async function (next) {
    if (!this.receiptNo) {
        const count = await mongoose.model("student_fee").countDocuments();
        this.receiptNo = `RCPT-${String(count + 1).padStart(5, "0")}`;

    }
    next();
});
const studentFeeModal = mongoose.model("student_fee", studentFeeSchema);
module.exports = studentFeeModal;

const studentFeeModal = require("../modals/studentFee")


exports.createStudentFee = async (req, res) => {
    const { studentName,
        courseName,
        batch,
        totalFee,
        amountPaid,
        modeOfPayment,
        paymentDate,
        remarks } = req.body

    try {

        if (!studentName || !courseName || !batch || !totalFee || !remarks) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }
        const studentFee = await studentFeeModal.create({
            studentName,
            courseName,
            batch,
            totalFee,
            amountPaid,
            modeOfPayment,
            paymentDate,
            remarks
        })

        if (!studentFee) {
            return res.status(404).json({
                success: false, message: "Faild to create fee structure"
            })
        }

        if (studentFee) {
            res.status(200).json({
                success: true,
                message: "Successfully created student fee structure",
                studentFee
            })
        }
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

exports.getAllFeeStructore = async (req, res) => {
    try {
        const { studentName } = req.query

        let query = {}
        if (studentName) {
            query.studentName = { $regex: studentName, $options: "i" }
        }
        const feeStructore = await studentFeeModal.find(query)

        if (!feeStructore) {
            return res.status(400).json({ success: false, message: "Faild to fetch student fee structore" })
        }

        res.status(200).json({
            success: true,
            feeStructore,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getStudentFeeStructore = async (req, res) => {
    const { id } = req.params
    try {
        const stufeeStructore = await studentFeeModal.findById(id)

        if (!stufeeStructore) {
            return res.status(400).json({ success: false, message: "fee structore not found" })

        }
        if (stufeeStructore) {
            res.status(200).json({
                success: true,
                stufeeStructore,
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.deleteFeeStructore = async (req, res) => {
    const { id } = req.params
    try {
        const deleteFeeStructore = await studentFeeModal.findByIdAndDelete(id)
        if (!deleteFeeStructore) {
            return res.status(400).json({ success: false, message: "fee structore not found" })

        }
        if (deleteFeeStructore) {
            res.status(200).json({
                success: true,
                message: "Fee structore deleted successfuly",
            })
        }
    } catch (error) {
        
    }
}
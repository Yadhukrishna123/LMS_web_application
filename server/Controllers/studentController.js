const studentModel = require("../modals/students")

exports.addStudent = async (req, res) => {
    try {
        const { name, email, phone, age, gender, profileImage, courseEnrolled, address } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ success: false, message: "Name, Email and Phone are required" });
        }

        const data = await studentModel.create(req.body);

        res.status(200).json({
            success: true,
            message: "Student added successfully",
            data,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.getAllStudent = async (req, res) => {
    try {
        const data = await studentModel.find();

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

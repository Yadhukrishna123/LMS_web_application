const assignments = require("../modals/assignmentModal")

exports.uploadAssignment = async (req, res) => {
    try {
        const { courseId, title, course, description, deadline, maxMarks } = req.body

        if (!courseId || !title || !course || !description || !deadline || !maxMarks) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const assignment = await assignments.create({
            courseId, title, course, description, deadline, maxMarks
        })

        res.status(200).json({
            success: true,
            message: "Assignment created successfuly",
            assignment
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}
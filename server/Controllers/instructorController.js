const instructorModel = require("../modals/instructor")

exports.addInstructor = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            bio,
            image,
            specialization,
            experience,
            qualification,
            linkedin,
            github,
            website,
        } = req.body;

        if (
            !name ||
            !email ||
            !bio ||
            !phone ||
            !image ||
            !specialization ||
            !experience ||
            !qualification
        ) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        const data = await instructorModel.create(req.body);

        res.status(200).json({
            success: true,
            message: "Instructor added successfully",
            data,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

<<<<<<< HEAD
exports.viewInstructors = async (rea, res) => {
    try {
        let query = {};

        const data = await instructorModel.find(query);

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

exports.getInstructer = async (req, res) => {
    const { id } = req.params

    try {
        const instructor = await instructorModel.findById(id)

        if (!instructor) {
            return res.status(400).json({
                success: false,
                message: "Instructor not found"
            })
        }

        if (instructor) {
            res.status(200).json({
                success: true,
                message: "Instructor deleted successfully",
                instructor
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.deleteInstructor = async (req, res) => {
    const { id } = req.params

    try {
        const deleteInstructor = await instructorModel.findByIdAndDelete(id)

        if (!deleteInstructor) {
            return res.status(400).json({
                success: false,
                message: "instructor not found"
            })
        }

        if (deleteInstructor) {
            res.status(200).json({
                success: true,
                message: "Instructor deleted successfully"
            })
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
=======
exports.viewInstructors = async (req, res) => {
    try {
        const { page = 1, limit = 5, search } = req.query;
        const query = {};

        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const total = await instructorModel.countDocuments(query);
        const data = await instructorModel.find(query).skip(skip).limit(parseInt(limit));

        res.status(200).json({
            success: true,
            data,
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalItems: total
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
>>>>>>> 9ed03048aa67943d6ce3867b34a7271126eb0e1c

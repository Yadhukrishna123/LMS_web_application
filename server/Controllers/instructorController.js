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
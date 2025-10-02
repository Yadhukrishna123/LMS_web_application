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
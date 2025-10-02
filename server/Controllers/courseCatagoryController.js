const courseModal = require("../modals/cateogeries")

exports.addCourseCatagory = async (req, res) => {
     try {
            const { title, description, image } = req.body;
    
            if (!title || !description || !image) {
                return res.status(400).json({
                    message: "All fields are required",
                });
            }
    
            const data = await courseModal.create(req.body);
            res.status(200).json({
                message: "Success",
                data,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
}

exports.viewAllCourseCatago = async (req, res) => {
     try {
        const { title } = req.query;
        let query = {};

        const data = await courseModal.find(query);

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
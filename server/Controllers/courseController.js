const courseModal = require("../modals/courses")

exports.createCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            duration,
            level,
            instructorDetails,
            category,
            image,
        } = req.body;

        if (!title || !description || !price || !duration || !level || !category) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const course = await courseModal.create(req.body);

        res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: course,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
exports.getAllCourse = async (req, res) => {
    try {
        const { title, category, price, duration, page = 1, limit = 5 } = req.query;
        const query = {};

        if (title) query.title = { $regex: title, $options: "i" };
        if (category && category.toLowerCase() !== "all") query.category = category.toLowerCase();

        if (price) {
            if (price === "1-1000") query.price = { $gte: 1, $lte: 1000 };
            else if (price === "1000-2000") query.price = { $gte: 1000, $lte: 2000 };
            else if (price === "2000-3000") query.price = { $gte: 2000, $lte: 3000 };
        }

        if (duration) query.duration = duration;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const total = await courseModal.countDocuments(query);

        const data = await courseModal.find(query).skip(skip).limit(parseInt(limit));

        res.status(200).json({
            success: true,
            data,
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalItems: total,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getCourse = async (req, res) => {
    try {
        const course = await courseModal.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json(course);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}
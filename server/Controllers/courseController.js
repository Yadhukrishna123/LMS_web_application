const courseModal = require("../modals/courses");


exports.createCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            isFree,
            duration,
            category,
            tags,
            courseModules,
            image,
            instructorName,
            instructorBio,
            hasMonthlyPayment,
            monthlyAmount,
        } = req.body;

        if (!title || !description || !price || !duration || !instructorName || !category) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const formattedTags = typeof tags === "string" ? tags.split(",").map(tag => tag.trim()) : tags;

        const course = await courseModal.create({
            title,
            description,
            price,
            isFree,
            duration,
            category,
            tags: formattedTags || [],
            image,
            courseModules,
            instructorName,
            instructorBio,
            hasMonthlyPayment,
            monthlyAmount,
        });

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: course,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.getAllCourse = async (req, res) => {
    try {
        const { title, category } = req.query
        let query = {};
        if (title) {
            query.title = { $regex: title, $options: "i" };
        }

        if (category) {
            query.category = { $regex: category, $options: "i" }; 
        }
        const courses = await courseModal.find(query)

        if (!courses) {
            return res.status(400).json({
                success: false,
                message: "Faild to fetch corse"
            })
        }

        res.status(200).json({
            success: true,
            courses,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single course by ID
exports.getCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await courseModal.findById(id);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        res.status(200).json({ success: true, data: course });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Delete a course by ID
exports.deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await courseModal.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        res.status(200).json({ success: true, message: "Course deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

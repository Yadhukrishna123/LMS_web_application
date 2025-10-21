const courseModal = require("../modals/courses")

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
            image,
            instructorName,
            instructorBio,
            hasMonthlyPayment,
            monthlyAmount,
        } = req.body;

        if (!title || !description || !price || !duration || !instructorName || !category) {
            return res.status(400).json({ message: "Missing required fields" });
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
            instructorName,
            instructorBio,
            hasMonthlyPayment,
            monthlyAmount,
        });

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
    // Get query params
    const { page = 1, limit = 5, title = "" } = req.query;

    const query = title ? { title: { $regex: title, $options: "i" } } : {};

    // Count total documents matching the query
    const totalCourses = await courseModal.countDocuments(query);

    // Fetch paginated results
    const courses = await courseModal
      .find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 }); 

    res.status(200).json({
      success: true,
      data: courses,
      page: Number(page),
      totalPages: Math.ceil(totalCourses / limit),
      totalCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getCourse = async (req, res) => {
    const { id } = req.params
    try {
        const course = await courseModal.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json(course);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

exports.deleteCourse = async (req, res) => {
    const { id } = req.params
    try {
        const course = await courseModal.findByIdAndDelete(id)

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "course not found"
            })
        }


        res.status(201).json({
            success: true,
            message: "course deleted succesfully!"
        })
    } catch (error) {

    }
}
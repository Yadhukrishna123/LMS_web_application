const courseModal = require("../modals/courses");
const Instructor = require("../modals/instructor");
const Payment = require("../modals/paymentModel");
const User = require("../modals/users");

// Create Course
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
            instructor, 
            instructoremail,
            hasMonthlyPayment,
            monthlyAmount,
        } = req.body;

        if (!title || !description || !duration || !instructor || !instructoremail || !category) {
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
            instructor, 
            instructoremail,
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
// Get All Courses
exports.getAllCourse = async (req, res) => {
    try {
        const { title, category } = req.query;
        let query = {};
        if (title) {
            query.title = { $regex: title, $options: "i" };
        }

        if (category) {
            query.category = { $regex: category, $options: "i" };
        }
        const courses = await courseModal.find(query);

        if (!courses) {
            return res.status(400).json({
                success: false,
                message: "Faild to fetch corse"
            });
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
// Get Single Course
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
// Delete Course
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

// Get Courses for Logged-in Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const instructor = await Instructor.findOne({ userId });

    if (!instructor) {
      return res.status(404).json({
        message: "Instructor profile not found",
        success: false
      });
    }

    const courses = await courseModal.find({ instructor: instructor._id });

    // Attach students count for each course
    const finalCourses = await Promise.all(
      courses.map(async (course) => {
        const enrolledStudents = await Payment.countDocuments({
          courseId: course._id.toString(),
          status: "success"
        });

        return {
          ...course._doc,
          enrolledStudents
        };
      })
    );

    res.status(200).json({
      success: true,
      instructor,
      courses: finalCourses
    });

  } catch (error) {
    console.error("Error fetching instructor courses:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


// Update Course
exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        
        const course = await courseModal.findById(id);
        
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (req.user.role === 'instructor') {

            const instructorProfile = await Instructor.findOne({ 
                userId: req.user._id 
            });
            
            if (!instructorProfile) {
                return res.status(403).json({
                    success: false,
                    message: "Instructor profile not found"
                });
            }
            
            if (!course.instructor || course.instructor.toString() !== instructorProfile._1d?.toString?.()) {
                return res.status(403).json({
                    success: false,
                    message: "You don't have permission to update this course"
                });
            }
        }
        
        if (req.body.tags && typeof req.body.tags === "string") {
            req.body.tags = req.body.tags.split(",").map(tag => tag.trim());
        }

        const updatedCourse = await courseModal.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Create Course
exports.createInstructorCourse = async (req, res) => {
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

        if (!title || !description || !duration || !category) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields" 
            });
        }

        const instructorProfile = await Instructor.findOne({ 
            userId: req.user._id 
        });
        
        if (!instructorProfile) {
            return res.status(400).json({ 
                success: false, 
                message: "Please complete your instructor profile first" 
            });
        }

        const formattedTags = typeof tags === "string" 
            ? tags.split(",").map(tag => tag.trim()) 
            : tags;

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
            instructor: instructorProfile._id,  
            instructorName: instructorName || instructorProfile.name,
            instructorBio: instructorBio || instructorProfile.bio,
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
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

exports.getCourseStudents = async (req, res) => {
  try {
    const courseId = req.params.id;

    const payments = await Payment.find({
      courseId,
      status: "success",
    }).select("studentName userEmail date createdAt");

    const students = payments.map((p) => ({
      _id: p._id,
      name: p.studentName,
      email: p.userEmail,
      enrolledAt: p.date || p.createdAt,
    }));

    res.status(200).json({
      success: true,
      students,
    });

  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

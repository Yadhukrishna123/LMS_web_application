const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 8080
const userModal = require("./modals/users")

const studentModel = require("./modals/students");


const institutionModal = require("./modals/Institution")
const institutionProfile = require("./modals/institutionProfile")



const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use("/api/v1", authRoutes)
app.use("/api/v1", recordedVideoRoutes)
app.use("/api/v1", enquiryRoutes)
app.use("/api/v1", courseRoutes)
app.use("/api/v1", instituteRoutes)
app.use("/api/v1", studentRoutes)
app.use("/api/v1", courseCatagoroutes)
app.use("/api/v1", instructorRoutes)

mongoose.connect("mongodb+srv://yadhumv365_db_user:mnWBNsTZjg6asrHE@cluster0.gfqyj29.mongodb.net/LMS_WEB_APPLICATION")






app.post("/upload_recorded_video", async (req, res) => {
    try {
        const { video, title, image } = req.body;

        if (!video || !title || !image) {
            return res.status(400).json({
                message: "Faild to upload video",
            });
        }

        const data = await recordedVideoModal.create(req.body);
        res.status(200).json({
            message: "Successfully uploaded",
            data,
        });
    } catch (error) { }
});

app.get("/get_all_records", async (req, res) => {
    try {
        const { title } = req.query;
        let query = {};
        if (title) {
            query.title = { $regex: title, $options: "i" };
        }

        const data = await recordedVideoModal.find(query);

        res.json({
            data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});




// emquiry //

app.post("/user_enquiries", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const data = await enquiryModal.create(req.body);
        res.status(200).json({
            message: "We will touch you",
            data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/getAll_enquiry", async (req, res) => {
    try {
        const { name } = req.query;
        let query = {};
        if (name) {
            query.name = { $regex: name, $options: "i" };
        }

        const data = await enquiryModal.find(query);
        res.json({
            data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});




// course ///

app.post("/create_course", async (req, res) => {
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
});


app.get("/get_All_courses", async (req, res) => {
    try {
        const { title, category, price, duration } = req.query;
        let query = {};
        if (title) {
            query.title = { $regex: title, $options: "i" };
        }
        if (category && category.toLowerCase() !== "all") {
            query.category = category.toLowerCase();
        }

        if (price) {
            if (price === "1-1000") {
                query.price = { $gte: 1, $lte: 1000 };
            } else if (price === "1000-2000") {
                query.price = { $gte: 1000, $lte: 2000 };
            } else if (price === "2000-3000") {
                query.price = { $gte: 2000, $lte: 3000 };
            }
        }


        if (duration) {
            query.duration = duration;
        }
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
});

// users //

app.post("/sign_up", async (req, res) => {
    try {
        const { firstname, lastname, email, phone, password, role } = req.body

        if (!firstname || !lastname || !email || !phone || !password || !role) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await userModal.create({
            firstname,
            lastname,
            email,
            phone,
            password: hashedPassword,
            role
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Faild to register"
            })
        }

        res.status(200).json({
            success: true,
            message: "Successfully registerd",
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

app.post("/login", async (req, res) => {
    const { email, phone, password } = req.body

    try {
        const user = await userModal.findOne({
            $or: [{ email: email }]
        })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalued email or phone"
            })
        }

        const isPassword = await bcrypt.compare(password, user.password)

        if (!isPassword) {
            return res.status(401).json({
                success: false,
                message: "Wrong password"
            })
        }

        // const generateToken = token(user)
        // console.log(generateToken);

        res.status(200).json({
            success: true,
            message: "You are successfully sign in",
            isAuthentication: true,
            user,

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

})

app.get("/getAll_user", async (req, res) => {
    try {
        const { firstname } = req.query

        let query = {}
        if (firstname) {
            query.firstname = { $regex: firstname, $options: "i" }
        }
        const user = await userModal.find(query)

        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

})





app.get("/courses/:id", async (req, res) => {
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
});

app.get("/Admin_view_All_courses", async (req, res) => {
    try {
        const { title, category, price, duration } = req.query;
        let query = {};
        if (title) {
            query.title = { $regex: title, $options: "i" };
        }
        if (category && category.toLowerCase() !== "all") {
            query.category = category.toLowerCase();
        }

        if (price) {
            if (price === "1-1000") {
                query.price = { $gte: 1, $lte: 1000 };
            } else if (price === "1000-2000") {
                query.price = { $gte: 1000, $lte: 2000 };
            } else if (price === "2000-3000") {
                query.price = { $gte: 2000, $lte: 3000 };
            }
        }

        if (duration) {
            query.duration = duration;
        }
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
});

app.post("/add_course_cateogry", async (req, res) => {
    try {
        const { title, description, image } = req.body;

        if (!title || !description || !image) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const data = await cateogry.create(req.body);
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
});

app.get("/view_All_categories", async (req, res) => {
    try {
        const { title } = req.query;
        let query = {};

        const data = await cateogry.find(query);

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
});

app.post("/add_instructor", async (req, res) => {
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
});

app.get("/view_instructor", async (req, res) => {
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
});





// Add student
app.post("/add_student", async (req, res) => {
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
});

// Get all students
app.get("/view_students", async (req, res) => {
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
});

// add institute

app.post("/add_institition", async (req, res) => {
    const { name, phone, email, password, address } = req.body

    try {
        if (!name || !phone || !email || !password || !address) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)


        const useinstitution = await institutionModal.create({
            name,
            phone,
            email,
            password: hashedPassword,
            address


        })

        if (!useinstitution) {
            return res.status(400).json({
                success: false,
                message: "Faild to register"
            })
        }

        res.status(200).json({
            success: true,
            message: "Successfully registerd",
            useinstitution
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

app.post("/login_institute", async (req, res) => {
    const { email, password } = req.body
    try {
        const institute = await institutionModal.findOne({ email })
        if (!institute) {
            return res.status(401).json({
                success: false,
                message: "Invalued email "
            })
        }

        const isPassword = await bcrypt.compare(password, institute.password)

        if (!isPassword) {
            return res.status(401).json({
                success: false,
                message: "Wrong password"
            })
        }



        res.status(200).json({
            success: true,
            message: "You are successfully sign in",
            isAuthentication: true,
            institute,

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

app.post("/add_institution_profile", async (req, res) => {
    const { image,
        instituteName,
        address,
        email,
        phone,
        website,
        gstin,
        accreditation,
        founded,
        courses,
        students,
        placement,
        facilities } = req.body

    try {
        if (!instituteName || !address || !email || !phone || !founded || !courses || !placement) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const instiProfule = await institutionProfile.create({
            image,
            instituteName,
            address,
            email,
            phone,
            website,
            gstin,
            accreditation,
            founded,
            courses,
            students,
            placement,
            facilities
        })

        if (!instiProfule) {
            return res.status(400).json({
                success: false,
                message: "Faild to create profile"
            })
        }

        res.status(200).json({
            success: true,
            message: "Successfully created",
            instiProfule
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

})

app.get("/get_profile_details", async (req, res) => {
    try {
        const profile = await institutionProfile.find()

        res.status(200).json({
            success: true,
            profile
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})















app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});





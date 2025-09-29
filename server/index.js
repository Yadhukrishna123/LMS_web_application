const dotenv = require("dotenv").config({ path: "./Config/config.env" })
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")

const recordedVideoModal = require("./modals/recordedVideos")
const enquiryModal = require("./modals/enquires")
const courseModal = require("./modals/courses")
const userModal = require("./modals/users")
// const session = require("express-session")
// const passport = require("./Config/pasport")
// const authRoute = require("./Routes/auth")
// const token = require("./jsonToken/jwt")


const app = express()
// app.use(cors({
//     origin: true,
//     credentials: true
// }))
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://yadhumv365_db_user:mnWBNsTZjg6asrHE@cluster0.gfqyj29.mongodb.net/LMS_WEB_APPLICATION")



// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false }
// }))
// app.use(passport.initialize())
// app.use(passport.session())


// app.use("/auth", authRoute);
// recorded video //

app.post("/upload_recorded_video", async (req, res) => {
    try {
        const { video, title, image } = req.body

        if (!video || !title || !image) {
            return res.status(400).json({
                message: "Faild to upload video"
            })
        }

        const data = await recordedVideoModal.create(req.body)
        res.status(200).json({
            message: "Successfully uploaded",
            data
        })


    } catch (error) {

    }
})

app.get("/get_all_records", async (req, res) => {
    try {
        const { title } = req.query
        let query = {}
        if (title) {
            query.title = { $regex: title, $options: "i" }
        }
        const data = await recordedVideoModal.find(query)

        res.json({
            data
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})


// emquiry //

app.post("/user_enquiries", async (req, res) => {
    try {
        const { name, email, message } = req.body

        if (!name || !email || !message) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const data = await enquiryModal.create(req.body)
        res.status(200).json({
            message: "We will touch you",
            data
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

app.get("/getAll_enquiry", async (req, res) => {
    try {
        const { name } = req.query
        let query = {}
        if (name) {
            query.name = { $regex: name, $options: "i" }
        }
        const data = await enquiryModal.find(query)
        res.json({
            data
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})


// course ///


app.post("/create_course", async (req, res) => {
    try {
        const { title, description, price, duration, level, instructor, category, image } = req.body

        if (!title || !description || !price || !duration || !level || !category || !instructor || !image) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const data = await courseModal.create(req.body)
        res.status(200).json({
            message: "Success",
            data
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.get("/get_All_courses", async (req, res) => {
    try {
        const { title, category, price, duration } = req.query
        let query = {}
        if (title) {
            query.title = { $regex: title, $options: "i" }
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
            query.duration = duration
        }
        const data = await courseModal.find(query)
        res.status(200).json({
            success: true,
            data
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
})


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
            $or: [{ email: email }, { phone: phone }]
        })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalued email of phone"
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
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

})



















app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);

})
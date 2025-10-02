const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const instructorModel = require("./modals/instructor");
const PORT = 8080




const authRoutes = require("./Routes/authRoutes")
const recordedVideoRoutes = require("./Routes/RecordedVideoRoutes")
const enquiryRoutes = require("./Routes/enquiryRoutes")
const courseRoutes = require("./Routes/courseRoutes")
const instituteRoutes = require("./Routes/institutionRoutes")
const studentRoutes = require("./Routes/studentRoutes")
const courseCatagoroutes = require("./Routes/courseCataRoutes")
const instructorRoutes = require("./Routes/instructorRoutes")


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







// app.post("/add_course_cateogry", async (req, res) => {

// });

// app.get("/view_All_categories", async (req, res) => {
//     try {
//         const { title } = req.query;
//         let query = {};

//         const data = await cateogry.find(query);

//         res.status(200).json({
//             success: true,
//             data,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// });

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





















app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});





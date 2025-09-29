const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 8080;
const recordedVideoModal = require("./modals/recordedVideos");
const enquiryModal = require("./modals/enquires");
const courseModal = require("./modals/courses");
const cateogry = require("./modals/cateogeries");
const instructorModel = require("./modals/instructor");

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(
  "mongodb+srv://yadhumv365_db_user:mnWBNsTZjg6asrHE@cluster0.gfqyj29.mongodb.net/LMS_WEB_APPLICATION"
);

// upload recorded video //

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
  } catch (error) {}
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

app.post("/create_course", async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      duration,
      level,
      instructor,
      category,
      image,
    } = req.body;

    if (
      !title ||
      !description ||
      !price ||
      !duration ||
      !level ||
      !category ||
      !instructor ||
      !image
    ) {
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

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

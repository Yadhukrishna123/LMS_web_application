const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const port = 8080
const recordedVideoModal = require("./modals/recordedVideos")

const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://yadhumv365_db_user:mnWBNsTZjg6asrHE@cluster0.gfqyj29.mongodb.net/LMS_WEB_APPLICATION")


// upload recorded video //

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











app.listen(port, () => {
    console.log(`server is running on port ${port}`);

})
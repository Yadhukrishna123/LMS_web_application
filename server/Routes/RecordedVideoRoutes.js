const express = require("express");
const { addRecordVideo, getAllRecordedVideos } = require("../Controllers/RecordedVideoController");
const router = express.Router();

router.post("/upload_recorded_video", addRecordVideo)
router.get("/get_all_records", getAllRecordedVideos)

module.exports = router
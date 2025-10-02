const recordedVideoModal = require("../modals/recordedVideos")

exports.addRecordVideo = async (req, res) => {
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
    } catch (error) {

    }
}

exports.getAllRecordedVideos = async (req, res) => {
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
}
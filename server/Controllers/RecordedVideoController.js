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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.title || "";

    const query = search ? { title: { $regex: search, $options: "i" } } : {};

    const totalItems = await recordedVideoModal.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    const data = await recordedVideoModal.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      data,
      page,
      totalPages,
      totalItems
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const batchmodals = require("../modals/batches"); 

exports.createBatch = async (req, res) => {
    try {
        const {
            batchName,
            batchCode,
            course,
            instructor,
            mode,
            maxSeats,
            status,
            startDate,
            endDate,
            duration,
            daysOfWeek,
            classStart,
            classEnd,
            timeZone,
            venue,
            address,
            mapsLink,
            description,
            notes,
            banner
        } = req.body;

        if (!batchName || !batchCode || !course || !instructor) {
            return res.status(400).json({
                message: "Batch Name, Batch Code, Course, and Instructor are required",
            });
        }

        const batch = await batchmodals.create(req.body);

        res.status(200).json({
            success: true,
            message: "Batch created successfully",
            data: batch,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.viewAllBatches = async (req, res) => {
    try {
        const { batchName, status } = req.query;
        let query = {};

        if (batchName) query.batchName = { $regex: batchName, $options: "i" };
        if (status) query.status = status;

        const batches = await batchmodals.find(query)
            .populate("course", "title")       
            .populate("instructor", "name");   

        res.status(200).json({
            success: true,
            data: batches,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

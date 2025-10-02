const enquiryModal = require("../modals/enquires")

exports.UserEnquiryie = async (req, res) => {
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
}

exports.getAllEnquiry = async (req, res) => {
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
}
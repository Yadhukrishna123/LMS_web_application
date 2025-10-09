const cateogry = require("../modals/cateogeries")

exports.addCourseCatagory = async (req, res) => {
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
}

exports.viewAllCourseCatago = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.title || "";

    // Build query for search
    const query = search ? { title: { $regex: search, $options: "i" } } : {};

    const totalItems = await cateogry.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    const data = await cateogry.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      data,
      page,
      totalPages,
      totalItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

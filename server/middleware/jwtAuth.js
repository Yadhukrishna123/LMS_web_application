const jwt = require("jsonwebtoken");
const User = require("../modals/users"); // make sure you have your User model

exports.authToken = async (req, res, next) => {
    try {
        console.log("Cookies received:", req.cookies);
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
                isAuthentication: false,
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_secret_key);
        // Attach user to request
        const user = await User.findById(decoded.id); // assuming your JWT has { id: user._id }
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
                isAuthentication: false,
            });
        }

        req.user = user; // 🔹 this fixes the undefined _id issue
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({
            success: false,
            message: "Unauthorized",
            isAuthentication: false,
        });
    }
};

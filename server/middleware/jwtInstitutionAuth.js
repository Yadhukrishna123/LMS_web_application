const jwt = require("jsonwebtoken");
const Institution = require("../modals/Institution");  // ← YOUR MODEL

exports.instiAuthToken = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
        isAuthentication: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_secret_key);

    const institution = await Institution.findById(decoded.id).select('_id institutionName adminFullName adminEmail');
    
    if (!institution) {
      return res.status(401).json({
        success: false,
        message: "Institution not found",
        isAuthentication: false,
      });
    }

    req.user = {
      _id: institution._id,
      role: "institution", 
      name: institution.adminFullName,
      email: institution.adminEmail,
      institutionName: institution.institutionName
    };

    console.log("Institution authenticated:", req.user.role, req.user.name);
    next();
  } catch (err) {
    console.error("Institution auth error:", err);
    res.status(401).json({
      success: false,
      message: "Invalid token",
      isAuthentication: false,
    });
  }
};

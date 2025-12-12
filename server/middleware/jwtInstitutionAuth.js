const jwt = require("jsonwebtoken")

exports.instiAuthToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
      isAuthentication: false,
    });
  }

  jwt.verify(token, process.env.JWT_secret_key, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
        isAuthentication: false,
      });
    }

    req.user = {
      _id: decoded.id,        
      role: decoded.role,     
      email: decoded.email,   
    };

    next();
  });
};

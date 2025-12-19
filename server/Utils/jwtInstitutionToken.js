const jwt = require("jsonwebtoken")

exports.getnstitutionToken = async (req, res) => {
    
    const options = {
        id: req.institute._id,
        time: Date.now()
    }
      const cookieParams = { httpOnly: true, sameSite: "none", secure: true };
    const token = await jwt.sign(options, process.env.JWT_secret_key, { expiresIn: "100d" })

    if (!token) {
        return res.status(500).json({
            success: false,
            message: "Faild to generate token",
            isAuthentication: false
        })
    }
    console.log(token);

    res.status(200).cookie("instituteToken", token, cookieParams).json({
        success: true,
        message: "You have successfully signed in",
        isAuthentication: true,
        institute: req.institute,
        token
    });
}
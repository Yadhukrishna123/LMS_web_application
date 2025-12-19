const jwt = require("jsonwebtoken")

exports.getToken = async (req, res) => {
    const options = {
        id: req.user._id,
        time: Date.now()
    }
      const cookieParams = { httpOnly: true, sameSite: "none", secure: true };
    const userToken = await jwt.sign(options, process.env.JWT_secret_key, { expiresIn: "100d" })

    if (!userToken) {
        return res.status(500).json({
            success: false,
            message: "Faild to generate token",
            isAuthentication: false
        })
    }
    console.log(userToken);
    res.status(200).cookie("userToken", userToken, cookieParams).json({
        success: true,
        message: "You are successfully sign in",
        isAuthentication: true,
        user: req.user,
        userToken

    })
}
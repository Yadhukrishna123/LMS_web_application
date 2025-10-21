const jwt = require("jsonwebtoken")

exports.authToken = (req, res, next) => {
    console.log("Cookies received:", req.cookies);
    const { token } = req.cookies

    jwt.verify(token, process.env.JWT_secret_key, (err, decode) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Faild to generate token",
                isAuthentication: false
            })
        }
        console.log(decode);
        next()
    })
}
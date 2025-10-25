const bcrypt = require("bcrypt");
const userModal = require("../modals/users")
const sendPasswordResetEmail = require("../Utils/sendPasswordResetEmail");
const crypto = require("crypto");
const { getToken } = require("../Utils/jwtToken");
const jwt = require("jsonwebtoken")


exports.signup = async (req, res) => {
    try {
        const { firstname, lastname, email, phone, password, role } = req.body

        if (!firstname || !lastname || !email || !phone || !password || !role) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await userModal.create({
            firstname,
            lastname,
            email,
            phone,
            password: hashedPassword,
            role
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Faild to register"
            })
        }

        res.status(200).json({
            success: true,
            message: "Successfully registerd",
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.login = async (req, res) => {
    const { email, phone, password } = req.body

    try {
        const user = await userModal.findOne({
            $or: [{ email: email }]
        })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalued email or phone"
            })
        }

        const isPassword = await bcrypt.compare(password, user.password)

        if (!isPassword) {
            return res.status(401).json({
                success: false,
                message: "Wrong password"
            })
        }

        await userModal.findByIdAndUpdate(user._id, { isLogin: true })
        const updatedUser = await userModal.findById(user._id);

        // res.status(200).json({
        //     success: true,
        //     message: "You are successfully sign in",
        //     isAuthentication: true,
        //     user:updatedUser

        // })

        req.user = user
        getToken(req, res)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getAllUsers = async (req, res) => {
    // console.log(req.cookies)
    try {
        const { firstname } = req.query
        let query = {};
        if (firstname) {
            query.firstname = { $regex: firstname, $options: "i" };
        }

        const users = await userModal.find(query)
        if (!users) {
            return res.status(400).json({
                success: false,
                messsage: "Users noy found",

            });
        }

        res.status(200).json({
            success: true,
            users,

        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.getUser = async (req, res) => {
    const { id } = req.params

    try {
        const item = await userModal.findById(id)

        if (!item) {
            return res.status(404).json({
                success: true,
                message: "user not found"
            })
        }

        res.status(200).json({
            successs: true,
            item,

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await userModal.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Users removed successfully!"
        });
    } catch (error) {

    }
}

exports.updateUsers = async (req, res) => {

    try {
        const { id } = req.params
        const user = await userModal.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        )

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            user,
            message: "User updated successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModal.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

        await user.save();

        const resetUrl = `http://localhost:5173/reset_password/${resetToken}`;
        console.log("Reset URL:", resetUrl);

        // Send password reset email
        await sendPasswordResetEmail(user.email, resetUrl, user.firstname);

        res.status(200).json({
            success: true,
            message: "Reset link sent to your email",
        });

    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

exports.resetPAssword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;


        if (password.length < 8)
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters." });
        if (!/[A-Z]/.test(password))
            return res.status(400).json({ success: false, message: "Password must include at least one uppercase letter." });
        if (!/[a-z]/.test(password))
            return res.status(400).json({ success: false, message: "Password must include at least one lowercase letter." });
        if (!/\d/.test(password))
            return res.status(400).json({ success: false, message: "Password must include at least one number." });
        if (!/[@$!%*?&]/.test(password))
            return res.status(400).json({ success: false, message: "Password must include at least one special character (@$!%*?&)." });


        const user = await userModal.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() },
        });
        if (!user) return res.status(400).json({ success: false, message: "Invalid or expired token" });


        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "Password reset successful, please login again." });
    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


exports.getMe = async (req, res) => {
    try {

        const token = req.cookies?.token;
        console.log(token)
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not logged in",
                user: null
            });
        }


        let decoded;

        decoded = jwt.verify(token, process.env.JWT_secret_key);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
                user: null
            });
        }
        const user = await userModal.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                user: null
            });
        }


        res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            user: null
        });
    }
};

exports.logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
            sameSite: "lax",
            secure: false,
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Logout failed",
        });
    }
}
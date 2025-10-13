const bcrypt = require("bcrypt");
const userModal = require("../modals/users")
const sendMail = require("../Utils/sendEmail")
const crypto = require("crypto")


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

        // const generateToken = token(user)
        // console.log(generateToken);

        res.status(200).json({
            success: true,
            message: "You are successfully sign in",
            isAuthentication: true,
            user,

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        let { page = 1, limit = 5, firstname } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        let query = {};
        if (firstname) {
            query.firstname = { $regex: firstname, $options: "i" };
        }

        const total = await userModal.countDocuments(query);
        const totalPages = Math.ceil(total / limit);

        const users = await userModal.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            success: true,
            users,
            page,
            totalPages,
            total
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
        const user = await userModal.findById(id)

        if (!user) {
            return res.status(404).json({
                success: true,
                message: "user not found"
            })
        }

        res.status(200).json({
            successs: true,
            user,

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteUser = async (req, res) => {
    
}


exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await userModal.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const resetToken = crypto.randomBytes(32).toString("hex")
        user.resetToken = resetToken
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;

        await user.save();
        console.log(resetToken)
        const resetUrl = `http://localhost:5174/reset_password/${resetToken}`;


        await sendMail(
            user.email,
            "Password Reset",
            `Hello ${user.firstname},\n\nClick here to reset your password:\n${resetUrl}\n\nThis link is valid for 15 minutes.`
        )
        await sendMail(
            studentEmail,
            `Course Purchase: ${courseTitle}`,
            null,
            `<h2>Purchase Successful!</h2><p>You purchased <b>${courseTitle}</b> for ₹${price}.</p>`,
            { studentName, courseTitle, price, date: new Date() }
        );

        res.status(200).json({
            success: true,
            message: "Reset link sent to your email",
        })
    } catch (error) {

    }
}

exports.resetPAssword = async (req, res) => {
    try {
        const { token } = req.params
        const { password } = req.body

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
            })
        }

        const user = await userModal.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();
        //  console.log("Reset Token:", resetToken);
        res.status(200).json(
            {
                success: true,
                message: "Password reset successful, please login again."
            });

    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}


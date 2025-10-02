const bcrypt = require("bcrypt");
const userModal = require("../modals/users")


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
            const { firstname } = req.query
    
            let query = {}
            if (firstname) {
                query.firstname = { $regex: firstname, $options: "i" }
            }
            const user = await userModal.find(query)
    
            res.status(200).json({
                success: true,
                user,
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
}
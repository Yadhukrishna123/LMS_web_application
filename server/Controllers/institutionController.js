const institutionModal = require("../modals/Institution")
const institutionProfile = require("../modals/institutionProfile")
const bcrypt = require("bcrypt")



exports.addInstitution = async (req, res) => {
    const { name, phone, email, password, address } = req.body

    try {
        if (!name || !phone || !email || !password || !address) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)


        const useinstitution = await institutionModal.create({
            name,
            phone,
            email,
            password: hashedPassword,
            address


        })

        if (!useinstitution) {
            return res.status(400).json({
                success: false,
                message: "Faild to register"
            })
        }

        res.status(200).json({
            success: true,
            message: "Successfully registerd",
            useinstitution
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.loginInstitute = async (req, res) => {
    const { email, password } = req.body
    try {
        const institute = await institutionModal.findOne({ email })
        if (!institute) {
            return res.status(401).json({
                success: false,
                message: "Invalued email "
            })
        }

        const isPassword = await bcrypt.compare(password, institute.password)

        if (!isPassword) {
            return res.status(401).json({
                success: false,
                message: "Wrong password"
            })
        }



        res.status(200).json({
            success: true,
            message: "You are successfully sign in",
            isAuthentication: true,
            institute,

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


exports.institutionProfile = async (req, res) => {
    const { image,
        instituteName,
        address,
        email,
        phone,
        website,
        gstin,
        accreditation,
        founded,
        courses,
        students,
        placement,
        facilities } = req.body

    try {
        if (!instituteName || !address || !email || !phone || !founded || !courses || !placement) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const instiProfule = await institutionProfile.create({
            image,
            instituteName,
            address,
            email,
            phone,
            website,
            gstin,
            accreditation,
            founded,
            courses,
            students,
            placement,
            facilities
        })

        if (!instiProfule) {
            return res.status(400).json({
                success: false,
                message: "Faild to create profile"
            })
        }

        res.status(200).json({
            success: true,
            message: "Successfully created",
            instiProfule
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getAllInstitutionProfile = async (req, res) => {
    try {
        const profile = await institutionProfile.find()

        res.status(200).json({
            success: true,
            profile
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
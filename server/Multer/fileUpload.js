const multer = require("multer")
const fs = require("fs")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = req.uploadPath || "files/others"

        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
})

const upload = multer({ storage });

module.exports = upload;
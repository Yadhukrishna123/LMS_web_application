const nodemailer = require("nodemailer")

const sendMail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.LMS_EMAIL,
                pass: process.env.LMS_PASSWORD
            }
        })

        await transporter.sendMail({
            from: `"LMS APP" <${process.env.LMS_EMAIL}>`,
            to,
            subject,
            text
        })
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

module.exports = sendMail
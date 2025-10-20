const rozorpay = require("razorpay")

const instance = new rozorpay({
    key_id: process.env.RazireKeyId,
    key_secret: process.env.RazoreKeySecret
})

module.exports = instance
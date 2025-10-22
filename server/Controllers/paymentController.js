const Payment = require("../modals/paymentModel");
const User = require("../modals/users");
const Course = require("../modals/courses");
const sendPaymentConfirmationEmail = require("../Utils/sendEmail");
const razorpay = require("../Utils/razorpay")
const crypto = require("crypto");
const { sendMailToStudentEmail } = require("../Utils/sendMailOfCourseBuyed");


exports.createPayment = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100,
      currency: currency || "INR",
      receipt: `rcptid_${Math.floor(Math.random() * 10000)}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Order creation failed"
    });
  }
};

exports.savePayment = async (req, res) => {
  try {
    const { razorpay_payment_id } = req.body;
    let paymentData = { ...req.body };

    if (razorpay_payment_id) {
      const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);


      paymentData.paymentMethod = paymentDetails.method || req.body.paymentMethod || null;
      paymentData.bank = paymentDetails.bank || req.body.bank || null;
      paymentData.wallet = paymentDetails.wallet || req.body.wallet || null;
      paymentData.vpa = paymentDetails.vpa || req.body.vpa || null;
    }


    const payment = new Payment(paymentData);
    await payment.save();


    try {
      await sendMailToStudentEmail(
        paymentData.userEmail,
        paymentData.courseName,
        paymentData.studentName
      )
      console.log("Payment confirmation email sent");
    } catch (error) {
      console.error("Failed to send payment email:", err);
    }

    res.status(200).json({
      success: true,
      message: "Payment saved successfully",
      payment
    });

  } catch (error) {
    console.error("Error saving payment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save payment"
    });
  }
};





exports.getKey = async (req, res) => {
  res.status(200).json({
    key: process.env.RazireKeyId
  })
}

exports.paymentVerification = async (req, res) => {

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, } = req.body

  const body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignatore = crypto.createHmac("sha256", process.env.RazoreKeySecret).update(body.toString()).digest("hex")

  const isAuthenticate = razorpay_signature === expectedSignatore

  if (isAuthenticate) {

    // return res.redirect(`http://localhost:5174/payment_success?reference=${razorpay_payment_id}`)

  } else {
    res.status(400).json({

      success: false
    })
  }


  res.status(200).json({

    success: true
  })

}

exports.getAllPaymentDetails = async (req, res) => {
  try {
    // const { name } = req.query

    // let query = {}
    // if (name) {
    //     query.name = { $regex: name, $options: "i" }
    // }
    const paymentDetails = await Payment.find()

    if (!paymentDetails) {
      return res.status(400).json({
        success: false,
        message: "Payment details not founf"
      })
    }

    res.status(200).json({
      success: true,
      paymentDetails,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
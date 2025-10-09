const Payment = require("../modals/paymentModel");

// Save payment details after successful Razorpay transaction
exports.createPayment = async (req, res) => {
  try {
    const { courseId, userId, amount, paymentId, status } = req.body;
    const payment = await Payment.create({ courseId, userId, amount, paymentId, status });
    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Payment save failed" });
  }
};

// Get all payments (for admin dashboard)
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("courseId", "title") 
      .populate("userId", "firstname lastname email") // use actual fields
      .sort({ date: -1 });
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch payments" });
  }
};

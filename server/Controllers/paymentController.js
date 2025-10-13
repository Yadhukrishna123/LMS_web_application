const Payment = require("../modals/paymentModel");
const User = require("../modals/users");
const Course = require("../modals/courses");
const sendPaymentConfirmationEmail = require("../Utils/sendEmail");

/**
 * Save a payment and send confirmation email with PDF invoice
 */
exports.createPayment = async (req, res) => {
  try {
    const { courseId, userId, amount, paymentId, status } = req.body;

    // 1️⃣ Save payment
    const payment = await Payment.create({ courseId, userId, amount, paymentId, status });

    // 2️⃣ Fetch user and course info
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ success: false, message: "User or Course not found" });
    }

    // 3️⃣ Only send email if payment is successful
    if (status === "success") {
      // Build order object for email/PDF
      const order = {
        studentName: user.firstname || `${user.firstname || ""} ${user.lastname || ""}` || "Student",
        paymentId: payment.paymentId || "N/A",
        date: payment.date ? new Date(payment.date) : new Date(),
        items: [
          {
            description: course.title || "Course",
            quantity: 1,
            price: amount || 0
          }
        ]
      };

      // Send professional email with attached PDF invoice
      await sendPaymentConfirmationEmail(user.email, order);
    }

    // 4️⃣ Respond to frontend
    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    console.error("Payment/email error:", error);
    res.status(500).json({ success: false, message: "Payment save or email failed" });
  }
};

/**
 * Get all payments
 */
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("courseId", "title")
      .populate("userId", "firstname lastname email")
      .sort({ date: -1 });

    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch payments" });
  }
};

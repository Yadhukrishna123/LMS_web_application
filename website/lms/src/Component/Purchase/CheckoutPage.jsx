import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "India",
    address: "",
    city: "",
    state: "",
  });

  // ✅ Fetch course details by ID
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/${courseId}`);
        setCourse(res.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  // ✅ Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePay = async () => {
    if (!course) return alert("Course not loaded yet");

    const options = {
      key: "rzp_test_RRFc5cm5d1Hd2D", // Replace with your Razorpay key
      amount: course.price * 100, // in paise
      currency: "INR",
      name: course.title,
      description: "Course Enrollment",
      handler: async function (response) {
        try {
          await axios.post(`${import.meta.env.VITE_API_URL}/create`, {
            courseId: course._id,
            userId: userId, 
            amount: course.price,
            paymentId: response.razorpay_payment_id,
            status: "success",
          });
          alert("✅ Payment successful!");
          navigate("/");
        } catch (error) {
          console.error(error);
          alert("⚠️ Payment successful, but saving failed!");
        }
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: "user@example.com",
      },
      theme: { color: "#8b5cf6" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleBack = () => navigate(-1);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600 text-lg">Loading course details...</p>
      </div>
    );
  }

  // 🧾 Compute summary amounts
  const coursePrice = course?.price || 0;
  const tax = Math.round(coursePrice * 0.18); // 18% GST
  const total = coursePrice + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
          <p className="text-gray-600">
            Complete your purchase for <span className="font-semibold">{course?.title}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Section - Billing Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Billing Details</h2>
              </div>

              {/* Form Fields */}
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country / Region <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white"
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Street address <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="address"
                    placeholder="House number and street name"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Town / City <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white"
                    >
                      <option value="">Select a state...</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary + Payment */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
              </div>

              {/* Order Summary Card */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 mb-6 border border-purple-100">
                <div className="flex items-center mb-4">
                  <img
                    src={course?.thumbnail || "https://via.placeholder.com/60"}
                    alt={course?.title}
                    className="w-16 h-16 rounded-xl mr-4 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{course?.title}</p>
                    <p className="text-sm text-gray-500">Category: {course?.category || "Course"}</p>
                  </div>
                </div>

                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Course Price</span>
                    <span>₹{coursePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="border-t border-gray-300 my-2"></div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePay}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transform hover:scale-105 transition shadow-lg hover:shadow-xl"
              >
                Complete Payment ₹{total}
              </button>

              <button
                onClick={handleBack}
                className="w-full mt-6 text-gray-600 hover:text-gray-900 font-medium py-2 transition flex items-center justify-center gap-2"
              >
                ← Back to Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

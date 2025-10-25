import React, { useState } from "react";
import axios from "axios";

const LowAttendance = () => {
  const [threshold, setThreshold] = useState(75);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("Sending...");
  try {
    const res = await axios.post("http://localhost:8080/api/v1/low-attendance", {
      message,
      threshold,
    });
    if (res.data.success) {
      setStatus(`Notifications sent to ${res.data.recipients.length} students!`);
      setMessage("");
    } else {
      setStatus(res.data.message);
    }
  } catch (err) {
    console.error(err);
    setStatus("Failed to send notifications");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50">
      <div className="relative bg-white rounded-3xl shadow-2xl p-10 w-full max-w-2xl border border-white border-opacity-30 backdrop-blur-xl">
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-gradient-to-r from-red-600 to-pink-500 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-700 via-pink-700 to-purple-700 bg-clip-text text-transparent mb-2">
            Low Attendance Alerts
          </h1>
          <p className="text-gray-500">Notify students who are below the attendance threshold</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 shadow grid gap-6">
            <input
              type="number"
              placeholder="Attendance Threshold (%)"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none hover:border-red-400 transition"
            />

            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              required
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none hover:border-red-400 transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 flex items-center justify-center"
          >
            Send Alerts
          </button>
          {status && <p className="mt-2 text-green-600 font-medium text-center">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default LowAttendance;

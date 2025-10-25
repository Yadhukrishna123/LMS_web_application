import React, { useState } from "react";
import axios from "axios";

const SendNotification = () => {
  const [type, setType] = useState("email");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const recipientsArray = recipients.split(",").map((r) => r.trim());
      const res = await axios.post("http://localhost:8080/api/v1/notifications/send", {
        type,
        subject,
        message,
        recipients: recipientsArray,
      });
      if (res.data.success) {
        setStatus(`${type.toUpperCase()} sent successfully!`);
        setMessage("");
        setRecipients("");
        setSubject("");
      }
    } catch (err) {
      console.error(err);
      setStatus(`Failed to send ${type}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50">
      <div className="relative bg-white rounded-3xl shadow-2xl p-10 w-full max-w-2xl border border-white border-opacity-30 backdrop-blur-xl">
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-gradient-to-r from-green-600 to-teal-500 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m0 8V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-700 via-teal-700 to-blue-700 bg-clip-text text-transparent mb-2">
            Send Notification
          </h1>
          <p className="text-gray-500">Send Email or SMS notifications to selected users</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 shadow grid gap-6">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none hover:border-green-400 transition"
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
            </select>

            {type === "email" && (
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none hover:border-green-400 transition"
              />
            )}

            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="4"
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none hover:border-green-400 transition resize-none"
            />

            <input
              type="text"
              placeholder={`Recipients (comma-separated ${type === "email" ? "emails" : "phone numbers"})`}
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none hover:border-green-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 flex items-center justify-center"
          >
            Send Notification
          </button>
          {status && <p className="mt-2 text-green-600 font-medium text-center">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default SendNotification;

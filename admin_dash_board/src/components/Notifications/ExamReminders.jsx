import React, { useState } from "react";
import axios from "axios";

const ExamReminders = () => {
  const [examTitle, setExamTitle] = useState("");
  const [examDate, setExamDate] = useState("");
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState("all");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await axios.post("http://localhost:8080/api/v1/notifications/send", {
        type: "exam_reminder",
        subject: `Reminder: ${examTitle}`,
        message,
        recipients,
      });
      if (res.data.success) {
        setStatus("Exam reminder sent successfully!");
        setExamTitle("");
        setExamDate("");
        setMessage("");
      }
    } catch (err) {
      console.error(err);
      setStatus("Failed to send reminder");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50">
      <div className="relative bg-white rounded-3xl shadow-2xl p-10 w-full max-w-2xl border border-white border-opacity-30 backdrop-blur-xl">
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-gradient-to-r from-green-600 to-teal-500 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 11v10h14V11" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-700 via-teal-700 to-blue-700 bg-clip-text text-transparent mb-2">
            Exam/Class Reminder
          </h1>
          <p className="text-gray-500">Notify students about upcoming exams or classes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 shadow grid gap-6">
            <input
              type="text"
              placeholder="Exam / Class Title"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none hover:border-green-400 transition"
            />

            <input
              type="datetime-local"
              placeholder="Exam / Class Date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none hover:border-green-400 transition"
            />

            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              required
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none hover:border-green-400 transition resize-none"
            />

            <select
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none hover:border-green-400 transition"
            >
              <option value="all">All Users</option>
              <option value="students">Students</option>
              <option value="instructors">Instructors</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 flex items-center justify-center"
          >
            Send Reminder
          </button>
          {status && <p className="mt-2 text-green-600 font-medium text-center">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default ExamReminders;

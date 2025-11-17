import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Eye } from "lucide-react";

const API_BASE = "http://localhost:8080/api/v1";

const QuizSubmissions = () => {
  const { quizId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");

useEffect(() => {
  const fetchSubmissions = async () => {
    try {
      // Fetch quiz info
      const quizRes = await axios.get(`${API_BASE}/get_quiz/${quizId}`);
      setQuizTitle(quizRes.data.quizName || "Quiz");

      // Fetch submissions
      const subRes = await axios.get(`${API_BASE}/get_all_user_quiz_answer/${quizId}`);
      setSubmissions(subRes.data || []);
    } catch (err) {
      console.error("Error fetching quiz submissions:", err);
    }
  };

  fetchSubmissions();
}, [quizId]);


  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-2">
        Submissions for:{" "}
        <span className="text-indigo-600">{quizTitle}</span>
      </h1>

      <p className="text-gray-600 mb-6">
        View all students who attempted this quiz.
      </p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-3 px-4 text-left">No</th>
              <th className="py-3 px-4 text-left">User Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Score</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {submissions.map((s, index) => {
              const dateObj = new Date(s.submittedAt);

              const percentage = (
                (s.score / s.totalQuestions) *
                100
              ).toFixed(0);

              return (
                <tr key={s._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>

                  <td className="py-3 px-4 font-medium capitalize">
                    {s.userName}
                  </td>

                  <td className="py-3 px-4">{s.email}</td>

                  <td className="py-3 px-4">
                    {s.score} / {s.totalQuestions}{" "}
                    <span className="text-gray-500">
                      ({percentage}%)
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    {dateObj.toLocaleDateString()}
                    <br />
                    <span className="text-gray-500 text-sm">
                      {dateObj.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <button
                      className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
                      onClick={() =>
                        alert("Details page not yet implemented")
                      }
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}

            {submissions.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No submissions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizSubmissions;

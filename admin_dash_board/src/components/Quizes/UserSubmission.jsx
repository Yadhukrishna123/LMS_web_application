import React, { useEffect, useState } from "react";
import axios from "axios";

const QuizSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/all_submissions")
      .then(res => setSubmissions(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Quiz Submissions</h2>
      {submissions.map((sub, i) => (
        <div key={i} className="mb-4 border p-4 rounded bg-gray-50">
          <p>
            <strong>User:</strong> {sub.userId ? `${sub.userId.name} (${sub.userId.email})` : "Anonymous"}
          </p>
          <p>
            <strong>Quiz:</strong> {sub.quizId ? `Quiz ${i + 1}` : "Unknown"}
          </p>
          <p>
            <strong>Score:</strong> {sub.score}/{sub.quizId?.questions?.length || 0}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QuizSubmissions;

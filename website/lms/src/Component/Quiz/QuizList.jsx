import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/view_all_quizzes")
      .then(res => setQuizzes(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Available Quizzes</h2>
      {quizzes.map((quiz) => (
        <div key={quiz._id} className="mb-4 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold">{quiz.title}</h3>
          <Link to={`/take_quiz/${quiz._id}`} className="text-blue-600 hover:underline">
            Take Quiz
          </Link>
        </div>
      ))}
    </div>
  );
};

export default QuizList;

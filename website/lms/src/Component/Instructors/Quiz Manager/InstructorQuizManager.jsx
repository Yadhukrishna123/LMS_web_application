import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaPlus,
  FaClipboardList,
  FaBook,
  FaEye,
  FaQuestionCircle,
  FaUsers,
  FaClock,
  FaTrash,
  FaCheckCircle
} from "react-icons/fa";

const InstructorQuizManager = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/all",
        { withCredentials: true }
      );
      setQuizzes(res.data.data || []);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
      toast.error("Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async (id, quizName) => {
    if (!window.confirm(`Delete "${quizName}"? This cannot be undone.`)) return;

    try {
      await axios.delete(`http://localhost:8080/api/v1/delete_quiz/${id}`);
      setQuizzes((prev) => prev.filter((q) => q._id !== id));
      toast.success("Quiz deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete quiz");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mx-auto mb-3"></div>
          <p className="text-gray-600">Loading quizzes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <FaClipboardList className="text-indigo-600" />
                Quiz Manager
              </h1>
              <p className="text-gray-600">Create and manage your course quizzes</p>
            </div>
            <Link
              to="/quiz/create"
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <FaPlus /> Create Quiz
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Quizzes</p>
                <p className="text-3xl font-bold text-gray-900">{quizzes.length}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                <FaClipboardList className="text-indigo-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Questions</p>
                <p className="text-3xl font-bold text-gray-900">
                  {quizzes.reduce((sum, q) => sum + (q.questions?.length || 0), 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <FaQuestionCircle className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Submissions</p>
                <p className="text-3xl font-bold text-gray-900">
                  {quizzes.reduce((sum, q) => sum + (q.submissions?.length || 0), 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <FaUsers className="text-green-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Quizzes List */}
        {quizzes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaClipboardList className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Quizzes Yet</h3>
            <p className="text-gray-600 mb-6">Create your first quiz to get started</p>
            <Link
              to="/quiz/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              <FaPlus /> Create First Quiz
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {quizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                {/* Card Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0 mr-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {quiz.quizName}
                      </h3>
                      {quiz.courseId?.title && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaBook className="text-xs flex-shrink-0" />
                          <span className="truncate">{quiz.courseId.title}</span>
                        </div>
                      )}
                    </div>
                    {quiz.isActive && (
                      <span className="flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold flex-shrink-0">
                        <FaCheckCircle className="text-xs" />
                        Active
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-indigo-600 mb-1">
                        <FaQuestionCircle className="text-sm" />
                        <span className="text-xs font-medium">Questions</span>
                      </div>
                      <p className="text-xl font-bold text-gray-900">
                        {quiz.questions?.length || 0}
                      </p>
                    </div>

                    <div className="text-center border-x border-gray-100">
                      <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                        <FaUsers className="text-sm" />
                        <span className="text-xs font-medium">Submissions</span>
                      </div>
                      <p className="text-xl font-bold text-gray-900">
                        {quiz.submissions?.length || 0}
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
                        <FaClock className="text-sm" />
                        <span className="text-xs font-medium">Duration</span>
                      </div>
                      <p className="text-xl font-bold text-gray-900">
                        {quiz.duration || "—"}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-4">
                    <Link
                       to={`/instructor_quiz_submissions/${quiz._id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm"
                    >
                      <FaEye /> View Submissions
                    </Link>
                    <button
                      onClick={() => handleDeleteQuiz(quiz._id, quiz.quizName)}
                      className="px-4 py-2.5 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors border border-red-200 text-sm"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorQuizManager;
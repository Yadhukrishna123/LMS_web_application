import React, { useState } from "react";
import axios from "axios";

const AddQuizzes = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    questions: [],
  });

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { questionText: "", options: ["", ""], correctOption: 0 },
      ],
    });
  };

  const removeQuestion = (index) => {
    const newQuestions = quiz.questions.filter((_, i) => i !== index);
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index].questionText = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const addOption = (qIndex) => {
    const newQuestions = [...quiz.questions];
    newQuestions[qIndex].options.push("");
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const removeOption = (qIndex, oIndex) => {
    const newQuestions = [...quiz.questions];
    if (newQuestions[qIndex].options.length > 2) {
      newQuestions[qIndex].options = newQuestions[qIndex].options.filter(
        (_, i) => i !== oIndex
      );
      setQuiz({ ...quiz, questions: newQuestions });
    }
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...quiz.questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleCorrectOptionChange = (qIndex, oIndex) => {
    const newQuestions = [...quiz.questions];
    newQuestions[qIndex].correctOption = oIndex;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quiz.title || !quiz.description) {
      alert("Please enter quiz title and description");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/create_quiz",
        quiz
      );
      console.log(res.data);
      alert("Quiz added successfully!");
      setQuiz({ title: "", description: "", questions: [] });
    } catch (error) {
      console.error(error.response?.data || error);
      alert("Error adding quiz");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
        Add Quiz
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <input
          type="text"
          placeholder="Quiz Title"
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <textarea
          placeholder="Quiz Description"
          value={quiz.description}
          onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {quiz.questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="border border-gray-300 p-6 rounded-lg relative bg-gray-50"
          >
            <button
              type="button"
              onClick={() => removeQuestion(qIndex)}
              className="absolute top-4 right-4 px-3 py-1 border border-red-300 rounded-md text-sm text-red-600 hover:bg-red-50 transition"
            >
              Remove Question
            </button>

            <input
              type="text"
              placeholder={`Question ${qIndex + 1}`}
              value={q.questionText}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-8"
              required
            />

            <div className="space-y-4">
              {q.options.map((opt, oIndex) => (
                <div key={oIndex} className="flex items-center gap-4">
                  <label className="flex items-center text-sm text-gray-700">
                    <input
                      type="radio"
                      name={`correctOption-${qIndex}`}
                      checked={q.correctOption === oIndex}
                      onChange={() => handleCorrectOptionChange(qIndex, oIndex)}
                      className="mr-2"
                    />
                    Correct
                  </label>

                  <input
                    type="text"
                    placeholder={`Option ${oIndex + 1}`}
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                    className="flex-1 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />

                  {q.options.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeOption(qIndex, oIndex)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => addOption(qIndex)}
                className="text-blue-600 hover:underline text-sm mt-2"
              >
                + Add Option
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={addQuestion}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition"
          >
            + Add Question
          </button>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
          >
            Submit Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuizzes;

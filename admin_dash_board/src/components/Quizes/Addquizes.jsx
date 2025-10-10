import React, { useState } from "react";
import axios from "axios";
import { FaPlus, FaSave, FaTimes, FaCheckCircle, FaQuestionCircle } from 'react-icons/fa';


const AddQuizzes = () => {
  const [quiz, setQuiz] = useState({
    question: "",
    options: {
      optionA: "",
      optionB: "",
      optionC: ""
    },
    rightAnswer: "",
  });



  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl p-10 w-full max-w-2xl backdrop-blur-lg border border-white border-opacity-20">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Create Quiz Question
          </h1>
          <p className="text-gray-500">Fill in the details to add a new question</p>
        </div>

        <div className="space-y-5">
          {/* Question Input */}
          <div className="group">
            <label htmlFor="question" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">Q</span>
              Question
            </label>
            <input
              type="text"
              id="question"
              className="w-full px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none transition duration-300 hover:border-purple-300"
              placeholder="What is your question?"
            />
          </div>

          {/* Options Grid */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Answer Options
            </h3>

            <div className="space-y-4">
              {/* Option 1 */}
              <div>
                <label htmlFor="option1" className="block text-sm font-medium text-gray-600 mb-2">
                  <span className="inline-block w-6 h-6 bg-blue-500 text-white rounded-lg text-center text-xs font-bold leading-6 mr-2">A</span>
                  Option 1
                </label>
                <input
                  type="text"
                  id="option1"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition duration-300"
                  placeholder="First option"
                />
              </div>

              {/* Option 2 */}
              <div>
                <label htmlFor="option2" className="block text-sm font-medium text-gray-600 mb-2">
                  <span className="inline-block w-6 h-6 bg-green-500 text-white rounded-lg text-center text-xs font-bold leading-6 mr-2">B</span>
                  Option 2
                </label>
                <input
                  type="text"
                  id="option2"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none transition duration-300"
                  placeholder="Second option"
                />
              </div>

              {/* Option 3 */}
              <div>
                <label htmlFor="option3" className="block text-sm font-medium text-gray-600 mb-2">
                  <span className="inline-block w-6 h-6 bg-orange-500 text-white rounded-lg text-center text-xs font-bold leading-6 mr-2">C</span>
                  Option 3
                </label>
                <input
                  type="text"
                  id="option3"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 outline-none transition duration-300"
                  placeholder="Third option"
                />
              </div>
            </div>
          </div>

          {/* Right Answer */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
            <label htmlFor="rightAnswer" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Correct Answer
            </label>
            <input
              type="text"
              id="rightAnswer"
              className="w-full px-5 py-3 bg-white border-2 border-green-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none transition duration-300 font-medium"
              placeholder="Enter the correct answer"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuizzes;

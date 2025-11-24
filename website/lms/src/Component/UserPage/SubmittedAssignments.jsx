import React from 'react'
import { FaDownload, FaCheckCircle, FaClock, FaTimes } from 'react-icons/fa'

const SubmittedAssignments = ({ setClickSubmittedAssignment }) => {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

                {/* HEADER */}
                <div className="sticky top-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-6 rounded-t-3xl z-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <FaCheckCircle className="text-white" />
                            Submitted Assignments
                        </h2>

                        <button
                            onClick={() => setClickSubmittedAssignment(false)}
                            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                        >
                            <FaTimes size={22} />
                        </button>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 space-y-4">

                    {/* Assignment 1 */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-l-4 border-green-500">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-lg font-bold text-gray-900">
                                        Python for Data Science Assignment
                                    </h4>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                                        <FaCheckCircle size={12} />
                                        Graded
                                    </span>
                                </div>

                                <p className="text-gray-600 text-sm mb-2">Course: Python for Data Science</p>

                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                    <p className="text-gray-500">Submitted: Nov 10, 2025</p>
                                    <p className="text-green-600 font-semibold">Score: 95/100</p>
                                </div>

                                <p className="text-gray-700 text-sm mt-2">
                                    Instructor Feedback: Excellent work! Your data visualization techniques are impressive.
                                </p>
                            </div>

                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-all">
                                <FaDownload size={14} />
                                Download
                            </button>
                        </div>
                    </div>

                    {/* Assignment 2 */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-l-4 border-blue-500">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-lg font-bold text-gray-900">Web Design Project</h4>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full flex items-center gap-1">
                                        <FaClock size={12} />
                                        Under Review
                                    </span>
                                </div>

                                <p className="text-gray-600 text-sm mb-2">Course: Web Development Bootcamp</p>

                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                    <p className="text-gray-500">Submitted: Nov 22, 2025</p>
                                    <p className="text-blue-600 font-semibold">Status: Pending Evaluation</p>
                                </div>

                                <p className="text-gray-700 text-sm mt-2">
                                    Your assignment is being reviewed by the instructor.
                                </p>
                            </div>

                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-all">
                                <FaDownload size={14} />
                                Download
                            </button>
                        </div>
                    </div>

                    {/* Assignment 3 */}
                    <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-6 border-l-4 border-purple-500">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-lg font-bold text-gray-900">JavaScript ES6+ Assignment</h4>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                                        <FaCheckCircle size={12} />
                                        Graded
                                    </span>
                                </div>

                                <p className="text-gray-600 text-sm mb-2">Course: JavaScript ES6+</p>

                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                    <p className="text-gray-500">Submitted: Nov 05, 2025</p>
                                    <p className="text-green-600 font-semibold">Score: 88/100</p>
                                </div>

                                <p className="text-gray-700 text-sm mt-2">
                                    Instructor Feedback: Good understanding of ES6 features. Work on async/await concepts.
                                </p>
                            </div>

                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-all">
                                <FaDownload size={14} />
                                Download
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SubmittedAssignments
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { FaBookmark, FaTimes } from 'react-icons/fa'


const UserAssignment = ({ setClickAssignment, assignment, userCourses }) => {
  console.log(userCourses)
   console.log(assignment)
  let [loading, setLoading] = useState(false)


  const getAllAssignments = async () => {
    try {
      setLoading(true)
      let res = await axios.get("http://localhost:8080/api/v1/get_all_assignments")
      console.log(res)
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllAssignments()
  }, [])

  const currentuserAssignment = userCourses.filter((c) => c.courseName === assignment.course)
  console.log(currentuserAssignment)
  return (
    <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50 p-4">

      {/* Popup Box */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 rounded-t-3xl z-10">
          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">
              <FaBookmark className="text-white text-2xl" />
              <div>
                <h2 className="text-2xl font-bold">Pending Assignments</h2>
                <p className="text-blue-100 text-sm">
                  Your recent assignment tasks
                </p>
              </div>
            </div>

            <button
              onClick={() => setClickAssignment(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6">

          {/* Assignment 1 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-l-4 border-blue-500 hover:shadow-lg transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-bold text-gray-900">
                    React Components Assignment
                  </h4>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                    Pending
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Course: Advanced React Development
                </p>
                <p className="text-gray-500 text-sm">Due: Dec 15, 2025</p>
                <p className="text-gray-700 text-sm mt-2">
                  Create a reusable component library with proper documentation
                </p>
              </div>

              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all whitespace-nowrap">
                Submit Assignment
              </button>
            </div>
          </div>

          {/* Assignment 2 */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-l-4 border-purple-500 hover:shadow-lg transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-bold text-gray-900">
                    Database Design Project
                  </h4>
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                    Overdue
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Course: Database Management Systems
                </p>
                <p className="text-red-500 text-sm font-semibold">
                  Due: Nov 20, 2025
                </p>
                <p className="text-gray-700 text-sm mt-2">
                  Design and implement a relational database for e-commerce
                </p>
              </div>

              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all whitespace-nowrap">
                Submit Assignment
              </button>
            </div>
          </div>

          {/* Assignment 3 */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border-l-4 border-green-500 hover:shadow-lg transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-bold text-gray-900">
                    API Integration Task
                  </h4>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                    Pending
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Course: Full Stack Development
                </p>
                <p className="text-gray-500 text-sm">Due: Dec 20, 2025</p>
                <p className="text-gray-700 text-sm mt-2">
                  Build a REST API and integrate with frontend application
                </p>
              </div>

              <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all whitespace-nowrap">
                Submit Assignment
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UserAssignment
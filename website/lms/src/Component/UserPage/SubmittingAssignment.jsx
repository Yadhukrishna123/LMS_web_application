import React from 'react'
import { FaArrowRight, FaCheckCircle, FaTimes} from 'react-icons/fa'

const SubmittingAssignment = ({setclickSubmittingAssignment}) => {
  return (
     <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50 p-4">

      {/* Popup Box */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-t-3xl z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FaArrowRight className="text-white text-2xl" />
              <div>
                <h2 className="text-2xl font-bold">Submit New Assignment</h2>
                <p className="text-green-100 text-sm">Upload your work below</p>
              </div>
            </div>

            <button
              onClick={() => setclickSubmittingAssignment(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-b-3xl">
          <div className="space-y-6">

            {/* Assignment Select */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Assignment
              </label>
              <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
                <option>React Components Assignment</option>
                <option>Database Design Project</option>
                <option>API Integration Task</option>
              </select>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Assignment File
              </label>
              <input
                type="file"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl transition-all
                      focus:ring-2 focus:ring-green-500 focus:border-transparent
                      file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                      file:bg-green-50 file:text-green-700 file:font-semibold hover:file:bg-green-100"
              />
            </div>

            {/* Comments */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Comments (Optional)
              </label>
              <textarea
                rows="4"
                placeholder="Add any notes or comments about your submission..."
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button className="w-full py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2">
              <FaCheckCircle />
              Submit Assignment
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmittingAssignment
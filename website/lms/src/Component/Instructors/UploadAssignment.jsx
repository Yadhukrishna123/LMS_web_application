import axios from 'axios';
import React, { useState } from 'react'
import { FaTimes, FaUpload, FaCalendarAlt, FaClock, FaBook, FaUsers, FaStar } from 'react-icons/fa';
import Swal from "sweetalert2";

const UploadAssignment = ({ setClickCreateAssignment, clickCreateAssignMent, course }) => {
    console.log(course)
    const [inputs, setInputs] = useState({
        course: "",
        title: '',

        description: '',
        dueDate: '',
        totalMarks: '',
        // assignedTo: '',
        file: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files && files.length > 0) {
            setInputs((prev) => ({
                ...prev, [name]: files[0]
            }));
        } else {
            setInputs((prev) => ({
                ...prev, [name]: value
            }));
        }

    };
    //    
    //  

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let payload = {
                courseId: 44,
                title: inputs.title,
                course: inputs.course,
                description: inputs.description,
                deadline: inputs.dueDate,
                maxMarks: inputs.totalMarks

            }

            let res = await axios.post("http://localhost:8080/api/v1/create_assignment", payload)
            if (res.data.success) {
                Swal.fire({
                    icon: "success",
                    title: res.data.message,
                    text: res.data.message || "successfully created assignment.",
                    showConfirmButton: false,
                    timer: 1800,
                });
            }
            console.log(res)
        } catch (error) {
            console.error(error)
        } finally {
            setClickCreateAssignment(false)
        }
    };

    console.log(inputs)

    if (!clickCreateAssignMent) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <button
                    onClick={() => setShowForm(true)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all font-bold"
                >
                    Open Assignment Upload
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 rounded-t-3xl z-10">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white bg-opacity-20 rounded-full">
                                <FaUpload className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Upload Assignment</h2>
                                <p className="text-blue-100 text-sm">Enter assignment details below</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setClickCreateAssignment(false)}
                            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-6">
                        {/* Assignment Info Section */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 shadow-sm space-y-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                                Assignment Information
                            </h3>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <FaUsers className="text-indigo-600" />
                                    Course *
                                </label>

                                <select
                                    name="course"
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl
             focus:ring-4 focus:ring-purple-200 focus:border-purple-500
             outline-none hover:border-purple-400 transition"
                                >
                                    <option value="">Select course</option>
                                    {course && course.map((c, i) => {
                                        return (
                                            <option key={i} value="class-10a">{c.title}</option>

                                        )
                                    })}
                                    {/* <option value="class-10b">Class 10B</option>
                                    <option value="class-11a">Class 11A</option>
                                    <option value="class-11b">Class 11B</option>
                                    <option value="all-students">All Students</option> */}
                                </select>
                            </div>

                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Assignment Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Enter assignment title"

                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none hover:border-blue-400 transition"
                                    />
                                </div>



                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        name="description"
                                        placeholder="Enter assignment description and instructions"
                                        onChange={handleChange}
                                        rows="4"
                                        required
                                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none hover:border-blue-400 transition resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Schedule & Details Section */}
                        <div className="bg-gradient-to-r from-indigo-50 to-pink-50 rounded-2xl p-6 shadow-sm space-y-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-gradient-to-b from-indigo-600 to-pink-600 rounded-full"></span>
                                Schedule & Details
                            </h3>

                            <div className="grid gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                            <FaCalendarAlt className="text-indigo-600" />
                                            Due Date *
                                        </label>
                                        <input
                                            type="date"
                                            name="dueDate"

                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none hover:border-purple-400 transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                            <FaStar className="text-indigo-600" />
                                            Total Marks *
                                        </label>
                                        <input
                                            type="number"
                                            name="totalMarks"
                                            placeholder="Enter total marks"
                                            onChange={handleChange}
                                            required
                                            min="0"
                                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none hover:border-purple-400 transition"
                                        />
                                    </div>


                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                                    {/* <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                        <FaUsers className="text-indigo-600" />
                                        Assigned To *
                                    </label>
                                    <select
                                        name="assignedTo"

                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none hover:border-purple-400 transition"
                                    >
                                        <option value="">Select class/group</option>
                                        <option value="class-10a">Class 10A</option>
                                        <option value="class-10b">Class 10B</option>
                                        <option value="class-11a">Class 11A</option>
                                        <option value="class-11b">Class 11B</option>
                                        <option value="all-students">All Students</option>
                                    </select>
                                </div> */}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                        <FaUpload className="text-indigo-600" />
                                        Upload File (Optional)
                                    </label>
                                    <input
                                        type="file"
                                        name="file"
                                        accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none hover:border-blue-400 transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                    {/* {formData.file && (
                                    <p className="mt-2 text-sm text-green-600 flex items-center gap-2">
                                        <FaBook className="w-4 h-4" />
                                        {formData.file.name}
                                    </p>
                                )} */}
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex gap-3 justify-end pt-2">
                            <button
                                type="button"
                                onClick={() => setClickCreateAssignment(false)}
                                className="flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors font-medium"
                            >
                                <FaTimes /> Cancel
                            </button>

                            <button

                                className="px-8 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                            >
                                <FaUpload className="w-5 h-5" />
                                Upload Assignment
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default UploadAssignment
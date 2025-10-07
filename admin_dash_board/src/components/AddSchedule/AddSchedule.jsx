import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';


const AddSchedule = () => {
    const [instru, setInstru] = useState([])


    const getInstrecters = async () => {
        try {

            const instructorsRes = await axios.get("http://localhost:8080/api/v1/view_instructor")
            console.log(instructorsRes);
            setInstru(instructorsRes.data.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getInstrecters()
    }, [])
    const [inputs, setInputs] = useState({
        batch: "",
        course: "",
        instructor: "",
        days: [],
        startTime: "",
        endTime: "",
        startDate: "",
        endDate: "",
        sessionType: "",
        location: "",
        status: "",
        notes: ""
    })
    console.log(inputs);

    const batches = ['Batch A', 'Batch B', 'Batch C', 'Batch D'];
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const handleInputs = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setInputs((prev) => ({
                ...prev,
                days: checked
                    ? [...prev.days, value]
                    : prev.days.filter((day) => day !== value),
            }));
        } else {
            setInputs((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        let payload = {
            batch: inputs.batch,
            instructor: inputs.instructor,
            course: inputs.course,
            days: inputs.days,
            startTime: inputs.startTime,
            endTime: inputs.endTime,
            startDate: inputs.startDate,
            endDate: inputs.endDate,
            sessionType: inputs.sessionType,
            location: inputs.location,
            status: inputs.status,
            description: inputs.notes

        }
        try {
            let res = await axios.post("http://localhost:8080/api/v1/add_schedule", payload)
            console.log(res);
            if (res.data.data) {
                toast.success(res.data.message)
            }

        } catch (error) {

        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <ToastContainer />
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Schedule</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Batch */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Batch <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="batch"
                            value={inputs.batch}
                            onChange={handleInputs}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Batch</option>
                            {batches.map((batch) => (
                                <option key={batch} value={batch}>
                                    {batch}
                                </option>
                            ))}
                        </select>
                        {/* {errors.batch && (
                            <p className="text-red-500 text-sm mt-1">{errors.batch}</p>
                        )} */}
                    </div>

                    {/* Course */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Course
                        </label>
                        <input
                            type="text"
                            name="course"
                            value={inputs.course}
                            onChange={handleInputs}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Auto-filled based on batch"
                        />
                    </div>

                    {/* Instructor */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Instructor <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="instructor"
                            value={inputs.instructor}
                            onChange={handleInputs}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Instructor</option>
                            {instru.map((i, k) => (
                                <option key={i._id || k} value={i.name}>
                                    {i.name}
                                </option>
                            ))}
                        </select>
                        {/* {errors.instructor && (
                            <p className="text-red-500 text-sm mt-1">{errors.instructor}</p>
                        )} */}
                    </div>

                    {/* Days */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Days of the Week <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {daysOfWeek.map((day) => (
                                <label
                                    key={day}
                                    className="flex items-center space-x-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        name="days"
                                        value={day}
                                        checked={inputs.days.includes(day)}
                                        onChange={handleInputs}
                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                                    />
                                    <span>{day}</span>
                                </label>
                            ))}
                        </div>
                        {/* {errors.days && (
                            <p className="text-red-500 text-sm mt-1">{errors.days}</p>
                        )} */}
                    </div>

                    {/* Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Time <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="time"
                                name="startTime"
                                value={inputs.startTime}
                                onChange={handleInputs}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                            {/* {errors.startTime && (
                                <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>
                            )} */}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                End Time <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="time"
                                name="endTime"
                                value={inputs.endTime}
                                onChange={handleInputs}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                            {/* {errors.endTime && (
                                <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>
                            )} */}
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={inputs.startDate}
                                onChange={handleInputs}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                            {/* {errors.startDate && (
                                <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
                            )} */}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                End Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                value={inputs.endDate}
                                onChange={handleInputs}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                            {/* {errors.endDate && (
                                <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
                            )} */}
                        </div>
                    </div>

                    {/* Session Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Session Type <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-4">
                            {["Lecture", "Lab", "Workshop"].map((type) => (
                                <label key={type} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="sessionType"
                                        value={type}
                                        checked={inputs.sessionType === type}
                                        onChange={handleInputs}
                                        className="w-4 h-4 text-indigo-600"
                                    />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                        {/* {errors.sessionType && (
                            <p className="text-red-500 text-sm mt-1">{errors.sessionType}</p>
                        )} */}
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Classroom / Online Link <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={inputs.location}
                            onChange={handleInputs}
                            placeholder="e.g., Room 101 or Google Meet link"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        {/* {errors.location && (
                            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                        )} */}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-4">
                            {["Active", "Inactive"].map((status) => (
                                <label key={status} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="status"
                                        value={status}
                                        checked={inputs.status === status}
                                        onChange={handleInputs}
                                        className="w-4 h-4 text-indigo-600"
                                    />
                                    <span>{status}</span>
                                </label>
                            ))}
                        </div>
                        {/* {errors.status && (
                            <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                        )} */}
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notes / Description
                        </label>
                        <textarea
                            name="notes"
                            value={inputs.notes}
                            onChange={handleInputs}
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Add additional notes..."
                        />
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700"
                        >
                            Add Schedule
                        </button>
                        <button
                            type="button"

                            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddSchedule
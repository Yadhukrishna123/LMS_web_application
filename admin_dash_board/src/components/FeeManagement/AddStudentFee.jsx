import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaSave, FaTimes } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'

const AddStudentFee = ({ setShowForm }) => {
    let [students, setStudents] = useState([])
    let [batches, setBatches] = useState([])
    let [courses, setCourses] = useState([])
    let [loading, setLoading] = useState(false)
    let paymentModes = ["cash", "upi", "card", "netbank"]
    const [input, setInput] = useState({
        studentName: "",
        courseName: "",
        batch: "",
        totalFee: 0,
        amountPaid: "",
        modeOfPayment: "",
        paymentDate: "",
        remarks: ""
    })

    const getAllData = async () => {
        let getallStudent = await axios.get("http://localhost:8080/api/v1/view_students")
        let getallBatch = await axios.get("http://localhost:8080/api/v1/view_all_batches")
        let getallCourse = await axios.get("http://localhost:8080/api/v1/get_all_courses")


        setStudents(getallStudent.data.data)
        setBatches(getallBatch.data.data)
        setCourses(getallCourse.data.data)
        console.log(getallCourse);

    }

    useEffect(() => {
        getAllData()
    }, [])
    const handleInputChange = (e) => {
        const { name, value } = e.target

        if (name === "courseName") {
            const selectedCourse = courses.find((c) => c.title === value)
            setInput({ ...input, [name]: value, totalFee: selectedCourse ? selectedCourse.price : 0 })
        } else {
            setInput({
                ...input,
                [name]: value,
            });
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault(e)
        setLoading(true)
        try {
            let payload = {
                studentName: input.studentName,
                courseName: input.courseName,
                batch: input.batch,
                totalFee: input.totalFee,
                amountPaid: input.amountPaid,
                modeOfPayment: input.modeOfPayment,
                paymentDate: input.paymentDate,
                remarks: input.remarks
            }
            let res = await axios.post("http://localhost:8080/api/v1/add_student_fee_structore", payload)
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message)
                setShowForm(false)
            }

        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    console.log(input);

    return (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
            <ToastContainer />
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto z-[999] relative">
                <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-2xl">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">
                            Add New Payment
                        </h2>
                        <button
                            onClick={() => setShowForm(false)}
                            className="text-white hover:bg-green-800 p-2 rounded-lg transition-colors"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Student Name */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Student Name *
                            </label>
                            <select
                                name="studentName"
                                // value={formData.studentName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">Select Student</option>
                                {students && students.map((s, i) => {
                                    return (
                                        <option key={i}>{s.name}</option>
                                    )
                                })}
                            </select>
                        </div>

                        {/* Course (Auto-fetched) */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Course*
                            </label>
                            <select
                                name="courseName"
                                // value={formData.studentName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">Select course</option>
                                {courses && courses.map((c, i) => {
                                    return (
                                        <option key={i}>{c.title}</option>
                                    )
                                })}
                            </select>
                        </div>

                        {/* Batch */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Batch
                            </label>
                            <select
                                name="batch"
                                // value={formData.batch}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">Select Batch (Optional)</option>
                                {batches && batches.map((b, i) => {
                                    return (
                                        <option key={i}>{b.batchName}</option>
                                    )
                                })}
                            </select>
                        </div>

                        {/* Total Fee (Auto-fetched) */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Total Fee
                            </label>
                            <input
                                type="text"
                                name="totalFee"
                                value={`₹${input.totalFee.toLocaleString()}`}
                                readOnly
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-600 font-bold"
                            />
                        </div>

                        {/* Amount Paid */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Amount Paid *
                            </label>
                            <input
                                type="number"
                                name="amountPaid"
                                // value={formData.amountPaid}
                                onChange={handleInputChange}
                                required
                                min="0"
                                step="0.01"
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter amount paid"
                            />
                        </div>

                        {/* Balance (Auto-calculated) */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Balance
                            </label>
                            <input
                                type="text"
                                // value={`₹${calculateBalance().toLocaleString()}`}
                                readOnly
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-yellow-50 text-slate-800 font-bold"
                            />
                        </div>

                        {/* Mode of Payment */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Mode of Payment *
                            </label>
                            <select
                                name="modeOfPayment"
                                // value={formData.modeOfPayment}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option>Select payment mode</option>

                                {paymentModes.map(mode => (
                                    <option key={mode} value={mode}>
                                        {mode}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Payment Date */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Payment Date *
                            </label>
                            <input
                                type="date"
                                name="paymentDate"
                                // value={formData.paymentDate}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        {/* Remarks */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Remarks / Note
                            </label>
                            <textarea
                                name="remarks"
                                // value={formData.remarks}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Optional note (e.g., 'Paid in 2 parts')"
                            />
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-3 justify-end  mt-6">
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium"
                        >
                            <FaTimes /> Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-[30%] flex items-center justify-center bg-green-500  text-white font-semibold py-2 px-4 rounded transition-colors duration-200 disabled:opacity-50"
                        >
                            {loading && (
                                <div className="h-5 mr-2 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            )}
                            {loading ? "creating..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddStudentFee
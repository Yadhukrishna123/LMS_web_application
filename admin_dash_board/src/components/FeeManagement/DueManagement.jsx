import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiSearch, FiFilter, FiBell, FiAlertCircle, FiCheckCircle, FiClock, FiPhone, FiMail, FiCalendar, FiDollarSign, FiUser, FiBookOpen, FiSend, FiEdit2, FiTrash2, FiPlus, FiDownload } from 'react-icons/fi';


const DueManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [feedetail, setFeeDetail] = useState([])
    const [stuDentDails, setStudntDetails] = useState([])



    const getAllData = async () => {
        let res = await axios.get("http://localhost:8080/api/v1/get_all_student_fee_structore")
        let stuDetails = await axios.get("http://localhost:8080/api/v1/view_students")
        console.log(stuDetails);
        console.log(res);

        setFeeDetail(res.data.feeStructore)
        setStudntDetails(stuDetails.data.data)

    }



    useEffect(() => {
        getAllData()
    }, [])

    const getStatusColor = (pendingAmount, dueDate) => {
        if (pendingAmount === 0) return 'success';
        const today = new Date();
        const due = new Date(dueDate);
        if (due < today) return 'overdue';
        if (due - today < 7 * 24 * 60 * 60 * 1000) return 'warning';
        return 'pending';
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                                <FiAlertCircle className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Due Management System</h1>
                                <p className="text-gray-600">Track and manage pending payments efficiently</p>
                            </div>
                        </div>

                    </div>
                </div>



                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by student name, ID, or course..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setFilterStatus('all')}
                                className={`px-4 py-2.5 rounded-lg font-medium transition-all ${filterStatus === 'all'
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilterStatus('pending')}
                                className={`px-4 py-2.5 rounded-lg font-medium transition-all ${filterStatus === 'pending'
                                    ? 'bg-amber-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => setFilterStatus('overdue')}
                                className={`px-4 py-2.5 rounded-lg font-medium transition-all ${filterStatus === 'overdue'
                                    ? 'bg-red-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Overdue
                            </button>
                            <button
                                onClick={() => setFilterStatus('completed')}
                                className={`px-4 py-2.5 rounded-lg font-medium transition-all ${filterStatus === 'completed'
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Completed
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                    <th className="px-4 py-4 text-left text-sm font-semibold">Student Info</th>
                                    <th className="px-4 py-4 text-left text-sm font-semibold">Course</th>
                                    <th className="px-4 py-4 text-right text-sm font-semibold">Total Fee</th>
                                    <th className="px-4 py-4 text-right text-sm font-semibold">Paid Amount</th>
                                    <th className="px-4 py-4 text-right text-sm font-semibold">Pending Amount</th>
                                    <th className="px-4 py-4 text-center text-sm font-semibold">Due Date</th>
                                    <th className="px-4 py-4 text-left text-sm font-semibold">Contact Info</th>
                                    <th className="px-4 py-4 text-center text-sm font-semibold">Reminder</th>
                                    <th className="px-4 py-4 text-center text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {feedetail.length === 0 ? (<tr>
                                    <td colSpan="10" className="text-center py-12 text-slate-500">
                                        No payment records found.
                                    </td>
                                </tr>) : (
                                    feedetail.map((f, i) => {
                                        return (
                                            <tr
                                                key={i}
                                                className='hover:bg-indigo-50 transition-colors bg-gray-50'

                                            >
                                                {/* Student Info */}
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-2 bg-indigo-100 rounded-lg">
                                                            <FiUser className="w-4 h-4 text-indigo-600" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-900">{f.studentName}</p>
                                                            {
                                                                stuDentDails.find((s) => s.name === f.studentName)?.studentId
                                                                || "N/A"
                                                            }
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Course */}
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <FiBookOpen className="w-4 h-4 text-purple-600" />
                                                        <span className="text-sm text-gray-700">{f.courseName}</span>
                                                    </div>
                                                </td>

                                                {/* Total Fee */}
                                                <td className="px-4 py-4 text-right">
                                                    <span className="text-sm font-medium text-gray-900">₹{f.totalFee}</span>
                                                </td>

                                                {/* Paid Amount */}
                                                <td className="px-4 py-4 text-right">
                                                    <span className="text-sm font-medium text-emerald-600">₹{f.amountPaid}</span>
                                                </td>

                                                {/* Pending Amount */}
                                                <td className="px-4 py-4 text-right">
                                                    <span className="text-sm font-bold text-red-600">
                                                        ₹{f.balance}
                                                    </span>
                                                </td>

                                                {/* Due Date */}
                                                <td className="px-4 py-4 text-center">
                                                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 rounded-lg">
                                                        <FiCalendar className="w-3 h-3 text-amber-600" />
                                                        <span className="text-xs font-medium text-gray-700">
                                                            date
                                                        </span>
                                                    </div>
                                                </td>



                                                {/* Contact Info */}
                                                <td className="px-4 py-4">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-1 text-xs text-gray-600">
                                                            <FiPhone className="w-3 h-3" />
                                                            <span>{stuDentDails.find((s) => s.name === f.studentName)?.phone}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-xs text-gray-600">
                                                            <FiMail className="w-3 h-3" />
                                                            <span className="truncate max-w-32">{stuDentDails.find((s) => s.name === f.studentName)?.email}</span>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Reminder Status */}
                                                <td className="px-4 py-4 text-center">
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                                        <FiBell className="w-3 h-4" size={30} />

                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center justify-center gap-2">

                                                        <button
                                                            className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
                                                            title="Send Reminder"
                                                        >
                                                            <FiSend className="w-4 h-4" />
                                                        </button>


                                                    </div>
                                                </td>
                                            </tr>

                                        )
                                    })
                                )}



                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default DueManagement
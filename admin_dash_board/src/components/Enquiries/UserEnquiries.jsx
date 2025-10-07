import React, { useEffect, useState } from 'react'
import axios from "axios"
import { FaEdit, FaTrash, FaSearch, FaEnvelope, FaPlus, FaCalendar, FaUser, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import Delete from '../TableActions/Delete';


const UserEnquiries = () => {
    let [enquiry, setEnquiry] = useState([])
    const [search, setSearch] = useState("");
    let [deleteClick, setDeleteClick] = useState(false)
    const deleteCont = "Are you sure that you delete enquiry"
    const getAllEnquiries = async () => {
        try {
            let res = await axios.get("http://localhost:8080/api/v1/getAll_enquiry")
            console.log(res.data.data);
            setEnquiry(res.data.data)


        } catch (error) {

        }
    }

    useEffect(() => {
        getAllEnquiries()
    }, [])

    const handleDelete = () => {
        setDeleteClick(true)
    }
    const getStatusConfig = (status) => {
        switch (status?.toLowerCase()) {
            case 'resolved':
                return {
                    bg: 'bg-green-100',
                    text: 'text-green-700',
                    border: 'border-green-200',
                    icon: <FaCheckCircle className="text-xs" />,
                    label: 'Resolved'
                };
            case 'replied':
                return {
                    bg: 'bg-blue-100',
                    text: 'text-blue-700',
                    border: 'border-blue-200',
                    icon: <FaCheckCircle className="text-xs" />,
                    label: 'Replied'
                };
            case 'pending':
                return {
                    bg: 'bg-yellow-100',
                    text: 'text-yellow-700',
                    border: 'border-yellow-200',
                    icon: <FaClock className="text-xs" />,
                    label: 'Pending'
                };
            default:
                return {
                    bg: 'bg-gray-100',
                    text: 'text-gray-700',
                    border: 'border-gray-200',
                    icon: <FaTimesCircle className="text-xs" />,
                    label: status || 'Unknown'
                };
        }
    };



    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
            {deleteClick && <Delete 
            setDeleteClick={setDeleteClick}
            deleteCont={deleteCont}
            />}
            <div className="w-full max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl">
                            <FaEnvelope className="text-white text-2xl" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">User Enquiries</h2>
                            <p className="text-gray-600">Manage and respond to user inquiries</p>
                        </div>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-96">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                placeholder="Search by name or email..."
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 px-4 py-2 rounded-xl border border-yellow-200">
                                <p className="text-sm text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {enquiry?.filter(e => e.status === 'pending').length || 0}
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-2 rounded-xl border border-blue-200">
                                <p className="text-sm text-gray-600">Total Enquiries</p>
                                <p className="text-2xl font-bold text-blue-600">{enquiry?.length || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Table Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                        <h3 className="text-xl font-semibold text-white">All Enquiries</h3>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Date & Time
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        User Details
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Message
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {enquiry && enquiry.length > 0 ? (
                                    enquiry.map((e, i) => {
                                        const statusConfig = getStatusConfig(e.status);
                                        return (
                                            <tr key={i} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                                                {/* Date & Time */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <FaCalendar className="text-blue-500 text-sm" />
                                                        <div>
                                                            <p className="text-sm font-semibold text-gray-900">
                                                                {formatDate(e.createdAt).split(',')[0]}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {formatDate(e.createdAt).split(',')[1]}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* User Details */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                                            <FaUser className="text-white text-sm" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-gray-900">{e.name}</p>
                                                            <p className="text-xs text-gray-500">{e.email}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Message */}
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-600 max-w-md line-clamp-2">{e.message}</p>
                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                                                        {statusConfig.icon}
                                                        {statusConfig.label}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition group"
                                                            title="Reply to enquiry"
                                                        >
                                                            <FaEnvelope className="group-hover:scale-110 transition" />
                                                        </button>
                                                        <button
                                                            className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition group"
                                                            title="Edit status"
                                                        >
                                                            <FaEdit className="group-hover:scale-110 transition" />
                                                        </button>
                                                        <button
                                                            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition group"
                                                            title="Delete enquiry"
                                                        >
                                                            <FaTrash className="group-hover:scale-110 transition" onClick={handleDelete}/>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <FaEnvelope className="text-gray-400 text-2xl" />
                                                </div>
                                                <p className="text-gray-500 font-medium">No enquiries found</p>
                                                <p className="text-gray-400 text-sm">Check back later for new messages</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                            Showing <span className="font-semibold text-gray-900">{enquiry?.length || 0}</span> of <span className="font-semibold text-gray-900">{enquiry?.length || 0}</span> enquiries
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition">
                                Previous
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                                1
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition">
                                2
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UserEnquiries
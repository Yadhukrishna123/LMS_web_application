import React, { useEffect, useState } from 'react'
import { FaPlus, FaEdit, FaTrash, FaSearch, FaMoneyBillWave } from 'react-icons/fa';
import AddStudentFee from './AddStudentFee';
import axios from 'axios';


const StudentFees = () => {
    const [showForm, setShowForm] = useState(false);
    const [payments, setPayments] = useState([]);
    const [search, setSearch] = useState("");
    const [feeStructore, setFeStructore] = useState([])



    const getAllFeeStructore = async () => {
        let res = await axios.get("http://localhost:8080/api/v1/get_all_student_fee_structore")
        setFeStructore(res.data.feeStructore)
    }


    useEffect(() => {

        getAllFeeStructore()

    }, []);




    // const calculateBalance = () => {
    //     const paid = parseFloat(formData.amountPaid) || 0;
    //     return formData.totalFee - paid;
    // };


    // const resetForm = () => {
    //     setFormData({
    //         studentName: '',
    //         course: '',
    //         batch: '',
    //         totalFee: 0,
    //         amountPaid: '',
    //         modeOfPayment: 'Cash',
    //         paymentDate: new Date().toISOString().split('T')[0],
    //         remarks: ''
    //     });
    // };





    const filteredPayments = payments.filter(p =>
        p.studentName.toLowerCase().includes(search.toLowerCase()) ||
        p.course.toLowerCase().includes(search.toLowerCase()) ||
        p.batch.toLowerCase().includes(search.toLowerCase())
    );

    const totalCollected = payments.reduce((acc, p) => acc + p.amountPaid, 0);
    const totalBalance = payments.reduce((acc, p) => acc + p.balance, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <FaMoneyBillWave className="text-4xl text-green-600" />
                        <h1 className="text-4xl font-bold text-slate-800">Student Fees Management</h1>
                    </div>
                    <p className="text-slate-600">Track student payments and manage fee records</p>
                </div>

                {/* Action Bar */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div className="relative flex-1 w-full md:max-w-md">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by student name, course, or batch..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowForm(true)}

                                className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                            >
                                <FaPlus /> Add Payment
                            </button>

                        </div>
                    </div>
                </div>

                {/* Form Modal */}
                {showForm && <AddStudentFee setShowForm={setShowForm} />}

                {/* Payments Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                                    <th className="text-left py-4 px-6 font-semibold">Student Name</th>
                                    <th className="text-left py-4 px-6 font-semibold">Course</th>
                                    <th className="text-left py-4 px-6 font-semibold">Batch</th>
                                    <th className="text-left py-4 px-6 font-semibold">Total Fee</th>
                                    <th className="text-left py-4 px-6 font-semibold">Amount Paid</th>
                                    <th className="text-left py-4 px-6 font-semibold">Balance</th>
                                    <th className="text-left py-4 px-6 font-semibold">Payment Mode</th>
                                    <th className="text-left py-4 px-6 font-semibold">Payment Date</th>
                                    <th className="text-left py-4 px-6 font-semibold">Remarks</th>
                                    <th className="text-center py-4 px-6 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feeStructore.length === 0 ? (
                                    <tr>
                                        <td colSpan="10" className="text-center py-12 text-slate-500">
                                            No payment records found. Click "Add Payment" to create one.
                                        </td>
                                    </tr>
                                ) : (
                                    feeStructore.map((p, i) => (
                                        <tr
                                            key={i}
                                            className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                        >
                                            <td className="py-4 px-6 font-semibold text-slate-800">
                                                {p.studentName}
                                            </td>
                                            <td className="py-4 px-6 text-slate-700">
                                                {p.courseName}
                                            </td>
                                            <td className="py-4 px-6 text-slate-700">
                                                <span className="inline-flex px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                                                    {p.batch || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 font-bold text-blue-600">
                                                ₹{p.totalFee.toLocaleString()}
                                            </td>
                                            <td className="py-4 px-6 font-bold text-green-600">
                                                ₹{p.amountPaid.toLocaleString()}
                                            </td>
                                            <td className="py-4 px-6 font-bold text-orange-600">
                                                ₹{p.balance.toLocaleString()}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                                    {p.modeOfPayment}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-slate-700">
                                                {new Date(p.paymentDate).toLocaleDateString('en-IN')}
                                            </td>
                                            <td className="py-4 px-6 text-slate-600 text-sm">
                                                {p.remarks || '-'}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex gap-2 justify-center">
                                                    <button
                                                        onClick={() => handleEdit(payment)}
                                                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(payment.id)}
                                                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                        <h3 className="text-sm font-medium opacity-90 mb-2">Total Students</h3>
                        <p className="text-4xl font-bold">{payments.length}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
                        <h3 className="text-sm font-medium opacity-90 mb-2">Total Collected</h3>
                        <p className="text-4xl font-bold">₹{totalCollected.toLocaleString()}</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
                        <h3 className="text-sm font-medium opacity-90 mb-2">Total Balance</h3>
                        <p className="text-4xl font-bold">₹{totalBalance.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentFees
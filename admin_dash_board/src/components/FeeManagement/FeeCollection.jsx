import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaSearch, FaMoneyBillWave, FaEdit, FaTrash, FaDownload } from 'react-icons/fa';
import Delete from '../TableActions/Delete';
import jsPDF from "jspdf";
import "jspdf-autotable";


const FeeCollection = () => {

    const [search, setSearch] = useState("");
    const [collections, setCollections] = useState([])
    const [id, setId] = useState("")
    const deleteCont = "Are you sure that you want to delete ?"
    let [deleteClick, setDeleteClick] = useState(false)


    const getAllFeecollection = async () => {
        let res = await axios.get(`http://localhost:8080/api/v1/get_all_student_fee_structore?studentName=${search}`)
        setCollections(res.data.feeStructore)
    }

    useEffect(() => {
        getAllFeecollection()
    }, [search])

    const handleDelete = (id) => {
        setDeleteClick(true)
        setId(id)
    }

    const onTimeDelete = () => {
        setCollections((prev) => prev.filter((c) => c._id !== id))

    }

    const handleDownload = (c) => {
        const doc = new jsPDF()
        doc.setFontSize(18);
        doc.text("Student Fee Receipt", 70, 15);

        doc.setFontSize(12);
        doc.text(`Receipt No: ${c.receiptNo}`, 14, 30);
        doc.text(`Date: ${c.paymentDate}`, 150, 30);

        doc.text("Student Information", 14, 45);
        doc.setFontSize(12);
        doc.text(`Student Name: ${c.studentName}`, 14, 55);
        doc.text(`Course / Semester: ${c.courseName}`, 14, 65);
        doc.text(`Mode of Payment: ${c.modeOfPayment}`, 14, 75);
        doc.text(`Collected By: ${c.amountPaid}`, 14, 85);
        doc.text(`Remarks: ${c.remarks || "-"}`, 14, 95);

        doc.autoTable({
            startY: 110,
            head: [["Description", "Amount (₹)"]],
            body: [
                ["Total Fee", c.totalFee],
                ["Amount Paid", c.amountPaid],
                ["Balance", c.totalFee - c.amountPaid],
            ],
        });


        const finalY = doc.lastAutoTable.finalY || 130;
        doc.text("Thank you for your payment!", 70, finalY + 20);
        doc.text("This is a computer-generated receipt.", 55, finalY + 30);

        doc.save(`Receipt_${c.receiptNo}.pdf`);

    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            {deleteClick && <Delete
                setDeleteClick={setDeleteClick}
                onTimeDelete={onTimeDelete}
                id={id}
                deleteCont={deleteCont}
                api_end_point="http://localhost:8080/api/v1/get_student_fee_structore"
            />}
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <FaMoneyBillWave className="text-4xl text-green-600" />
                        <h1 className="text-4xl font-bold text-slate-800">Student Fees collection</h1>
                    </div>
                    <p className="text-slate-600">Track student payments and manage fee records</p>
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="relative w-full md:max-w-md">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by receipt ID, student name, or course..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>

                {/* Payments Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                                    <th className="text-left py-4 px-6 font-semibold">Receipt ID</th>
                                    <th className="text-left py-4 px-6 font-semibold">Student Name</th>
                                    <th className="text-left py-4 px-6 font-semibold">Course / Semester</th>
                                    <th className="text-left py-4 px-6 font-semibold">Amount Collected</th>
                                    <th className="text-left py-4 px-6 font-semibold">Mode of Payment</th>
                                    <th className="text-left py-4 px-6 font-semibold">Payment Date</th>
                                    <th className="text-left py-4 px-6 font-semibold">Collected By</th>
                                    <th className="text-left py-4 px-6 font-semibold">Remarks</th>
                                    <th className="text-center py-4 px-6 font-semibold">Actions</th>
                                    <th className="text-center py-4 px-6 font-semibold">Download receipt</th>

                                </tr>
                            </thead>
                            <tbody>
                                {collections.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className="text-center py-12 text-slate-500">
                                            No payment records found.
                                        </td>
                                    </tr>
                                ) : (
                                    collections.map((c, i) => (
                                        <tr
                                            key={i}
                                            className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                        >
                                            <td className="py-4 px-6 font-semibold text-blue-600">
                                                {c.receiptNo}
                                            </td>
                                            <td className="py-4 px-6 font-semibold text-slate-800">
                                                {c.studentName}
                                            </td>
                                            <td className="py-4 px-6 text-slate-700">
                                                {c.courseName}
                                            </td>
                                            <td className="py-4 px-6 font-bold text-green-600">
                                                ₹{c.totalFee}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                                    {c.modeOfPayment}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-slate-700">
                                                {c.paymentDate}
                                            </td>
                                            <td className="py-4 px-6 text-slate-700">
                                                {c.amountPaid}
                                            </td>
                                            <td className="py-4 px-6 text-slate-600 text-sm">
                                                {c.remarks || '-'}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex gap-2 justify-center">
                                                    <button
                                                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        // onClick={() => handleDelete(record.id)}
                                                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                                        title="Delete"
                                                        onClick={() => handleDelete(c._id)}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>

                                            <td className="py-4 px-6">
                                                <div className="flex gap-2 justify-center">
                                                    <button
                                                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <FaDownload onClick={() => handleDownload(c)} />
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
                        <h3 className="text-sm font-medium opacity-90 mb-2">Total Records</h3>
                        <p className="text-4xl font-bold">{collections.length}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
                        <h3 className="text-sm font-medium opacity-90 mb-2">Total Collected</h3>
                        {/* <p className="text-4xl font-bold">₹{totalCollected.toLocaleString()}</p> */}
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                        <h3 className="text-sm font-medium opacity-90 mb-2">Average Payment</h3>
                        {/* <p className="text-4xl font-bold">₹{Math.round(totalCollected / feeRecords.length).toLocaleString()}</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeeCollection
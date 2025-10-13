import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaDollarSign, FaPlus, FaEdit, FaTrash, FaFilePdf, FaPrint } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API_BASE = "http://localhost:8080/api/v1";

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch all payments
  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/all`);
      setPayments(res.data?.data || []);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching payments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Filtered payments based on search
  const filteredPayments = payments.filter((p) => {
    const name = p.userId?.firstname?.toLowerCase() + " " + p.userId?.lastname?.toLowerCase() || "";
    const email = p.userId?.email?.toLowerCase() || "";
    const course = p.courseId?.title?.toLowerCase() || "";
    const query = search.toLowerCase();
    return name.includes(query) || email.includes(query) || course.includes(query);
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const currentRecords = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  // Export PDF
  const handleExportPDF = () => {
    if (!filteredPayments.length) return alert("No payments to export");

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Payments List", 14, 15);
    doc.setFontSize(11);

    const tableColumns = ["Sl No.", "Course", "User", "Email", "Amount (₹)", "Payment ID", "Status", "Date"];
    const tableRows = filteredPayments.map((p, i) => [
      i + 1,
      p.courseId?.title || "N/A",
      p.userId ? `${p.userId.firstname} ${p.userId.lastname}` : "N/A",
      p.userId?.email || "N/A",
      p.amount || 0,
      p.paymentId || "N/A",
      p.status || "Pending",
      p.date ? new Date(p.date).toLocaleDateString() : "N/A",
    ]);

    autoTable(doc, {
      head: [tableColumns],
      body: tableRows,
      startY: 25,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [34, 197, 94] },
      theme: "grid",
    });

    doc.save("Payments_List.pdf");
  };

  // Print table
  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=900,height=700");
    const tableRows = filteredPayments
      .map(
        (p, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${p.courseId?.title || "N/A"}</td>
          <td>${p.userId ? `${p.userId.firstname} ${p.userId.lastname}` : "N/A"}</td>
          <td>${p.userId?.email || "N/A"}</td>
          <td>${p.amount || 0}</td>
          <td>${p.paymentId || "N/A"}</td>
          <td>${p.status || "Pending"}</td>
          <td>${p.date ? new Date(p.date).toLocaleDateString() : "N/A"}</td>
        </tr>`
      )
      .join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>Payments List</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            tbody tr:hover { background-color: #f0fdf4; }
          </style>
        </head>
        <body>
          <h2>Payments List</h2>
          <table>
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Course</th>
                <th>User</th>
                <th>Email</th>
                <th>Amount (₹)</th>
                <th>Payment ID</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-gradient-to-br from-green-500 to-teal-500 p-3 rounded-xl">
            <FaDollarSign className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Payments Management</h2>
            <p className="text-gray-600">Manage and monitor all transactions</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between flex-wrap">
          <div className="relative w-full md:w-96 mb-4 md:mb-0">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              placeholder="Search by user, email, or course..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={handleExportPDF} className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl flex items-center gap-2">
              <FaFilePdf /> Export PDF
            </button>
            <button onClick={handlePrint} className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl flex items-center gap-2">
              <FaPrint /> Print
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg flex items-center gap-2">
              <FaPlus /> Add Payment
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
          <div className="bg-gradient-to-r from-green-500 to-teal-500 px-6 py-4">
            <h3 className="text-xl font-semibold text-white">All Transactions</h3>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Sl No.</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Course</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">User</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Email</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Amount (₹)</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Payment ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                    Loading payments...
                  </td>
                </tr>
              ) : currentRecords.length ? (
                currentRecords.map((p, i) => (
                  <tr key={p._id} className="hover:bg-green-50 transition">
                    <td className="px-6 py-4">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                    <td className="px-6 py-4">{p.courseId?.title || "N/A"}</td>
                    <td className="px-6 py-4">{p.userId ? `${p.userId.firstname} ${p.userId.lastname}` : "N/A"}</td>
                    <td className="px-6 py-4">{p.userId?.email || "N/A"}</td>
                    <td className="px-6 py-4">{p.amount}</td>
                    <td className="px-6 py-4">{p.paymentId}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${
                        p.status?.toLowerCase() === "success"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : p.status?.toLowerCase() === "failed"
                          ? "bg-red-100 text-red-700 border-red-200"
                          : "bg-yellow-100 text-yellow-700 border-yellow-200"
                      }`}>
                        {p.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4">{p.date ? new Date(p.date).toLocaleDateString() : "N/A"}</td>
                    <td className="px-6 py-4 text-center flex justify-center gap-2">
                      <button className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg"><FaEdit /></button>
                      <button className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg"><FaTrash /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                    No payments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 flex items-center justify-between border-t border-gray-200 mt-4 rounded-2xl">
              <div className="text-sm text-gray-600">
                Showing page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={goPrev}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={goNext}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;

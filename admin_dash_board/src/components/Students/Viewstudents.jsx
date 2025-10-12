import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt, FaSearch, FaFilePdf, FaPrint, FaUsers, FaPlus } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleteClick, setDeleteClick] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const itemsPerPage = 5;
  const deleteCont = "Are you sure you want to delete this student?";

  // ✅ Fetch students with pagination & search
  const getStudents = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/api/v1/view_students", {
        params: { page, limit: itemsPerPage, search },
      });
      setStudents(res.data.data || []);
      setCurrentPage(res.data.page || 1);
      setTotalPages(res.data.totalPages || 1);
      setTotalItems(res.data.totalItems || res.data.data?.length || 0);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching students:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents(1);
  }, [search]);

  // ✅ Delete student
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/get_student/${id}`);
      setStudents((prev) => prev.filter((s) => s._id !== id));
      setTotalItems((prev) => prev - 1);
      setDeleteClick(false);
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  // ✅ Export PDF
  const handleExportPDF = () => {
    if (!students || students.length === 0) {
      alert("No students to export");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Students List", 14, 15);
    doc.setFontSize(11);
    doc.setTextColor(100);

    const tableColumn = ["#", "Name", "Email", "Course", "Batch"];
    const tableRows = students.map((s, index) => [
      index + 1,
      s.name || "-",
      s.email || "-",
      s.courseEnrolled || "-",
      s.batch?.batchName || "-",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [59, 130, 246] },
    });

    doc.save("Students_List.pdf");
  };


  const handlePrint = () => {
    const printContent = document.getElementById("student-table-section").innerHTML;
    const printWindow = window.open("", "", "width=900,height=700");
    printWindow.document.write(`
      <html>
        <head>
          <title>Students List</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
          </style>
        </head>
        <body>
          <h2>Students List</h2>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      {/* Delete Confirmation */}
      {deleteClick && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">{deleteCont}</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteClick(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl">
            <FaUsers className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Student Management</h2>
            <p className="text-gray-600">Manage and monitor all students</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-2 rounded-xl border border-blue-200">
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-blue-600">{totalItems}</p>
            </div>

            <button
              onClick={handleExportPDF}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-2"
            >
              <FaFilePdf /> Export PDF
            </button>

            <button
              onClick={handlePrint}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-2"
            >
              <FaPrint /> Print
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-2">
              <FaPlus /> Add Students
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div id="student-table-section" className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h3 className="text-xl font-semibold text-white">All Students</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">#</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Batch</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-600">Loading students...</td>
                  </tr>
                ) : students.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">No students found</td>
                  </tr>
                ) : (
                  students.map((student, index) => (
                    <tr key={student._id} className="hover:bg-blue-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-700">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td className="px-6 py-4">{student.name}</td>
                      <td className="px-6 py-4">{student.email}</td>
                      <td className="px-6 py-4">{student.courseEnrolled}</td>
                      <td className="px-6 py-4">{student.batch?.batchName || "-"}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => { setDeleteId(student._id); setDeleteClick(true); }}
                          className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-600">Showing page {currentPage} of {totalPages}</div>
              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => getStudents(currentPage - 1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => getStudents(i + 1)}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium ${currentPage === i + 1 ? "bg-blue-600 text-white" : "border-gray-300 text-gray-700"} hover:bg-white transition`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => getStudents(currentPage + 1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition"
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

export default ViewStudents;

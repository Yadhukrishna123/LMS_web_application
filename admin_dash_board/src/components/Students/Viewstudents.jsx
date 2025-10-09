import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSearch, FaUserGraduate, FaPlus, FaBook, FaCalendar } from 'react-icons/fa';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  const getStudents = async (page = 1) => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/view_students", {
        params: { page, limit: itemsPerPage, search },
      });
      setStudents(res.data.data || []);
      setCurrentPage(res.data.page);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.totalItems);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    getStudents(1);
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl">
            <FaUserGraduate className="text-white text-2xl" />
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
              value={search}
              placeholder="Search by name..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-2 rounded-xl border border-blue-200">
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-blue-600">{totalItems}</p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-2">
              <FaPlus /> Add Student
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h3 className="text-xl font-semibold text-white">All Students</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Student ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Student</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Enrolled Courses</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Registration Date</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {students.length > 0 ? (
                  students.map((s, i) => (
                    <tr key={i} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-700">{s.studentId}</td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img src={s.profileImage} alt={s.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-300 shadow-md" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{s.name}</p>
                          <p className="text-xs text-gray-500">{s.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{s.phone}</td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                          <FaBook className="text-white text-sm" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{s.courseEnrolled}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${s.status === "Active" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex items-center gap-2 text-sm text-gray-600">
                        <FaCalendar className="text-gray-400 text-sm" />
                        {new Date(s.joinedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center flex justify-center gap-2">
                        <button className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition group"><FaEdit className="group-hover:scale-110 transition" /></button>
                        <button className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition group"><FaTrash className="group-hover:scale-110 transition" /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <FaUserGraduate className="text-gray-400 text-2xl" />
                        </div>
                        <p className="text-gray-500 font-medium">No students found</p>
                        <p className="text-gray-400 text-sm">Try adjusting your search</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <p className="text-sm text-gray-600">Showing page {currentPage} of {totalPages}</p>
              <div className="flex gap-2">
                <button disabled={currentPage === 1} onClick={() => getStudents(currentPage - 1)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white">Previous</button>
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} onClick={() => getStudents(i + 1)} className={`px-4 py-2 border rounded-lg text-sm font-medium ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border-gray-300 text-gray-700'} hover:bg-white transition`}>{i + 1}</button>
                ))}
                <button disabled={currentPage === totalPages} onClick={() => getStudents(currentPage + 1)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white">Next</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewStudents;

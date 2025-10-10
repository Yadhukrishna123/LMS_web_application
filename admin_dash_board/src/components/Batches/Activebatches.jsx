import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSearch, FaChalkboardTeacher, FaPlus, FaCalendar } from "react-icons/fa";

const ActiveBatches = () => {
  const [batches, setBatches] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  const getBatches = async (page = 1) => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/view_all_batches", {
        params: { page, limit: itemsPerPage, batchName: search },
      });
      setBatches(res.data.data || []);
      setCurrentPage(res.data.page);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.totalItems);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    getBatches(1);
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl">
            <FaChalkboardTeacher className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Batch Management</h2>
            <p className="text-gray-600">Manage and monitor all batches</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              placeholder="Search by batch name..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-2 rounded-xl border border-blue-200">
              <p className="text-sm text-gray-600">Total Batches</p>
              <p className="text-2xl font-bold text-blue-600">{totalItems}</p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-2">
              <FaPlus /> Add Batch
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h3 className="text-xl font-semibold text-white">All Batches</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Batch Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Code</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Course</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Instructor</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Mode</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Seats</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Dates</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Description</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {batches.length > 0 ? (
                  batches.map((batch, i) => (
                    <tr key={i} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all">
                      <td className="px-6 py-4 font-medium text-gray-800">{batch.batchName}</td>
                      <td className="px-6 py-4 text-gray-600">{batch.batchCode}</td>
                      <td className="px-6 py-4 text-gray-600">{batch.course?.title || "N/A"}</td>
                      <td className="px-6 py-4 text-gray-600">{batch.instructor?.name || "N/A"}</td>
                      <td className="px-6 py-4 text-gray-600">{batch.mode}</td>
                      <td className="px-6 py-4 text-gray-600">{batch.maxSeats}</td>
                      <td className="px-6 py-4 text-gray-600">{batch.status}</td>
                      <td className="px-6 py-4 text-gray-600">{new Date(batch.startDate).toLocaleDateString()} - {new Date(batch.endDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-gray-600">{batch.description?.slice(0, 40)}...</td>
                      <td className="px-6 py-4 text-center flex justify-center gap-2">
                        <button className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition"><FaEdit /></button>
                        <button className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"><FaTrash /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="px-6 py-12 text-center text-gray-500">
                      No batches found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 flex items-center justify-between border-t border-gray-200 mt-2">
              <p className="text-sm text-gray-600">Showing page {currentPage} of {totalPages}</p>
              <div className="flex gap-2">
                <button disabled={currentPage === 1} onClick={() => getBatches(currentPage - 1)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white">Previous</button>
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} onClick={() => getBatches(i + 1)} className={`px-4 py-2 border rounded-lg text-sm font-medium ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border-gray-300 text-gray-700'} hover:bg-white transition`}>
                    {i + 1}
                  </button>
                ))}
                <button disabled={currentPage === totalPages} onClick={() => getBatches(currentPage + 1)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white">Next</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveBatches;

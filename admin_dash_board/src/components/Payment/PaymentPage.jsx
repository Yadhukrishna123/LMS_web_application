import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSearch,
  FaDollarSign,
  FaPlus,
  FaCalendar,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/all");
      //console.log("Fetched payments:", res.data.data);
      setPayments(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Filtered payments based on search
const filteredPayments = (payments || []).filter((p) => {
  const name = p.userId?.name?.toLowerCase() || "";
  const email = p.userId?.email?.toLowerCase() || "";
  const course = p.courseId?.title?.toLowerCase() || "";
  const query = search.toLowerCase();
  return name.includes(query) || email.includes(query) || course.includes(query);
});

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-green-500 to-teal-500 p-3 rounded-xl">
              <FaDollarSign className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Payments Management</h2>
              <p className="text-gray-600">Manage and monitor all transactions</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                placeholder="Search by user, email, or course..."
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>

            {/* Stats + Add */}
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-green-50 to-teal-50 px-4 py-2 rounded-xl border border-green-200">
                <p className="text-sm text-gray-600">Total Payments</p>
                <p className="text-2xl font-bold text-green-600">{payments?.length || 0}</p>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-2">
                <FaPlus />
                Add Payment
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-teal-500 px-6 py-4">
            <h3 className="text-xl font-semibold text-white">All Transactions</h3>
          </div>

          <div className="overflow-x-auto">
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
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((p, i) => (
                    <tr key={p._id} className="hover:bg-gradient-to-r hover:from-green-50 hover:to-teal-50 transition-all">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-700">{i + 1}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{p.courseId?.title || "N/A"}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {p.userId ? `${p.userId.firstname} ${p.userId.lastname}` : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{p.userId?.email || "N/A"}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{p.amount}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{p.paymentId}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${
                            p.status?.toLowerCase() === "success"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : p.status?.toLowerCase() === "failed"
                              ? "bg-red-100 text-red-700 border-red-200"
                              : "bg-yellow-100 text-yellow-700 border-yellow-200"
                          }`}
                        >
                          {p.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex items-center gap-2 text-sm text-gray-600">
                        <FaCalendar className="text-gray-400 text-sm" />
                        {p.date ? new Date(p.date).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition group">
                            <FaEdit className="group-hover:scale-110 transition" />
                          </button>
                          <button className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition group">
                            <FaTrash className="group-hover:scale-110 transition" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <FaDollarSign className="text-gray-400 text-2xl" />
                        </div>
                        <p className="text-gray-500 font-medium">No transactions found</p>
                        <p className="text-gray-400 text-sm">Try adjusting your search</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredPayments.length}</span> of <span className="font-semibold text-gray-900">{payments.length}</span> transactions
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white">Previous</button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;

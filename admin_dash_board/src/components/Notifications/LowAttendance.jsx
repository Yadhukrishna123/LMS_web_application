import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBell, FaSearch, FaExclamationTriangle } from "react-icons/fa";

const LowAttendanceAlerts = () => {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [alertSent, setAlertSent] = useState(false);

  // 🔹 Fetch low attendance data on mount
  useEffect(() => {
    fetchLowAttendance();
  }, []);

  const fetchLowAttendance = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/low-attendance-list",
        { threshold: 75 }
      );

      if (res.data.success) {
        // Sort students by attendance percentage (lowest first)
        const sorted = res.data.data.sort(
          (a, b) => parseFloat(a.percentage) - parseFloat(b.percentage)
        );
        setStudents(sorted);
        setFiltered(sorted);
      }
    } catch (err) {
      console.error("Error fetching attendance:", err);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    if (!value) return setFiltered(students);

    const filteredList = students.filter((s) =>
      s.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(filteredList);
  };

  const handleSendAlerts = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/low-attendance",
        {
          message:
            "Your attendance is below 75%. Please attend more classes to avoid issues.",
          threshold: 75,
        }
      );
      if (res.data.success) {
        setAlertSent(true);
        setTimeout(() => setAlertSent(false), 3000);
      }
    } catch (err) {
      console.error("Error sending alerts:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-gradient-to-br from-red-600 to-orange-600 p-3 rounded-xl">
            <FaExclamationTriangle className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Low Attendance Alerts
            </h2>
            <p className="text-gray-600">
              View students with attendance below 75% and send alerts.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 px-4 py-2 rounded-xl border border-red-200">
              <p className="text-sm text-gray-600">Total Students Below 75%</p>
              <p className="text-2xl font-bold text-red-600">
                {filtered.length}
              </p>
            </div>

            <button
              onClick={handleSendAlerts}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-2"
            >
              <FaBell /> Send Alerts
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 px-6 py-4">
            <h3 className="text-xl font-semibold text-white">
              Students Below 75% Attendance
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Attendance (%)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filtered.length > 0 ? (
                  filtered.map((s, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all duration-200"
                    >
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {s.name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                          {s.name}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {s.email}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-red-600">
                        {s.percentage || 0}%
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No students found below 75% attendance.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Success alert */}
        {alertSent && (
          <div className="mt-6 text-green-700 font-semibold bg-green-50 border border-green-200 rounded-xl p-4 text-center shadow-md">
            ✅ Alerts sent to all students below 75% attendance!
          </div>
        )}
      </div>
    </div>
  );
};

export default LowAttendanceAlerts;

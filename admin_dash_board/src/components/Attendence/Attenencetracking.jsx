import React, { useEffect, useState } from "react";
import { FaFilePdf, FaPrint, FaPlus } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API_BASE = "http://localhost:8080/api/v1";

const Attenencetracking = () => {
  const [records, setRecords] = useState([]);
  const [batches, setBatches] = useState([]);
  const [batch, setBatch] = useState("");
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState("");
  const [fromDate, setFromDate] = useState(new Date().toISOString().split("T")[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalPresent: 0,
    totalAbsent: 0,
    totalLate: 0,
    totalExcused: 0,
    average: 0,
  });

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [batchRes, courseRes] = await Promise.all([
          fetch(`${API_BASE}/view_all_batches`),
          fetch(`${API_BASE}/get_all_courses`),
        ]);
        const batchData = await batchRes.json();
        const courseData = await courseRes.json();
        if (batchData.success) setBatches(batchData.data);
        if (courseData.success) setCourses(courseData.data);
      } catch (err) {
        console.error("Error fetching filters:", err);
      }
    };
    fetchFilters();
  }, []);

  const fetchAttendanceData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        from: fromDate,
        to: toDate,
        batchId: batch || "all",
        status: statusFilter,
        search: searchTerm,
      });
      const res = await fetch(`${API_BASE}/get_attendance_reports?${params.toString()}`);
      const data = await res.json();
      if (data.success) setRecords(data.data || []);
    } catch (err) {
      console.error("Error fetching attendance:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const allRecords = records.flatMap((att) => att.records || []);
    const total = allRecords.length || 1;
    const present = allRecords.filter((r) => r.status === "present").length;
    const absent = allRecords.filter((r) => r.status === "absent").length;
    const late = allRecords.filter((r) => r.status === "late").length;
    const excused = allRecords.filter((r) => r.status === "excused").length;

    setStats({
      totalPresent: present,
      totalAbsent: absent,
      totalLate: late,
      totalExcused: excused,
      average: ((present / total) * 100).toFixed(1),
    });
  }, [records]);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const handleExportPDF = () => {
  if (!records || records.length === 0) {
    alert("No attendance records to export");
    return;
  }

  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Attendance Report", 14, 15);
  doc.setFontSize(11);
  doc.setTextColor(100);

  const tableColumns = ["Date", "Student Name", "Roll No", "Status", "Time"];
  const tableRows = records.flatMap((att) =>
    att.records.map((rec) => [
      new Date(att.date).toLocaleDateString(),
      rec.studentId?.name || "-",
      rec.studentId?.rollNo || "-",
      rec.status || "-",
      rec.markedTime || "--:--",
    ])
  );

  autoTable(doc, {
    head: [tableColumns],
    body: tableRows,
    startY: 25,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [59, 130, 246] },
  });

  doc.save("Attendance_Report.pdf");
};

  const handlePrint = () => {
    const printContent = document.getElementById("batch-table-section").innerHTML;
    const printWindow = window.open("", "", "width=900,height=700");
    printWindow.document.write(`
      <html>
        <head>
          <title>Batches List</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
          </style>
        </head>
        <body>
          <h2>Batches List</h2>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
            Attendance Reports & Listing
          </h1>
          <p className="text-gray-500 mt-2">View, analyze, and export attendance records</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-green-500 text-white rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">{stats.totalPresent}</div>
            <p>Total Present</p>
          </div>
          <div className="bg-red-500 text-white rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">{stats.totalAbsent}</div>
            <p>Total Absent</p>
          </div>
          <div className="bg-yellow-500 text-white rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">{stats.totalLate}</div>
            <p>Total Late</p>
          </div>
          <div className="bg-purple-500 text-white rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">{stats.totalExcused}</div>
            <p>Total Excused</p>
          </div>
          <div className="bg-blue-600 text-white rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">{stats.average}%</div>
            <p>Average Attendance</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow mb-4 grid grid-cols-1 md:grid-cols-5 gap-4">
          <select
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="">All Batches</option>
            {batches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.batchName}
              </option>
            ))}
          </select>

          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="">All Courses</option>
            {courses.map((c) => (
              <option key={c._id} value={c.title}>
                {c.title}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded-xl px-4 py-3"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded-xl px-4 py-3"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="all">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
            <option value="excused">Excused</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-end gap-3 mb-6">
          <button
            onClick={fetchAttendanceData}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Apply Filters
          </button>
          <button
            onClick={handleExportPDF}
            className="px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl flex items-center gap-2 hover:scale-105 transition text-sm"
          >
            <FaFilePdf /> Export PDF
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl flex items-center gap-2 hover:scale-105 transition text-sm"
          >
            <FaPrint /> Print
          </button>
          <button
            onClick={() => {
              setBatch("");
              setCourse("");
              setFromDate(new Date().toISOString().split("T")[0]);
              setToDate(new Date().toISOString().split("T")[0]);
              setStatusFilter("all");
              setSearchTerm("");
              fetchAttendanceData(); // fetch all records again
            }}
            className="bg-gray-300 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-400 transition"
          >
            Clear Filters
          </button>

        </div>

        {/* Attendance Table */}
        <div
          id="batch-table-section"
          className="bg-white rounded-2xl shadow overflow-x-auto"
        >
          {loading ? (
            <div className="p-6 text-center">Loading attendance...</div>
          ) : records.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No records found</div>
          ) : (
            <table className="w-full table-auto">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Student Name</th>
                  <th className="px-6 py-3 text-left">Roll No</th>
                  <th className="px-6 py-3 text-center">Status</th>
                  <th className="px-6 py-3 text-center">Time</th>
                </tr>
              </thead>
              <tbody>
                {records.flatMap((att) =>
                  att.records.map((rec) => (
                    <tr key={rec._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-3">{new Date(att.date).toLocaleDateString()}</td>
                      <td className="px-6 py-3">{rec.studentId?.name}</td>
                      <td className="px-6 py-3">{rec.studentId?.rollNo}</td>
                      <td className="px-6 py-3 text-center">{rec.status}</td>
                      <td className="px-6 py-3 text-center">{rec.markedTime || "--:--"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attenencetracking;

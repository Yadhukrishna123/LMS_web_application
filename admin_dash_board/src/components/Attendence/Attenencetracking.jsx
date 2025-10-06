import React, { useEffect, useState } from "react";

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
    average: 0
  });

  // Fetch batches and courses
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [batchRes, courseRes] = await Promise.all([
          fetch(`${API_BASE}/view_all_batches`),
          fetch(`${API_BASE}/get_all_courses`)
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

  // Fetch attendance data
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

      if (data.success) {
        setRecords(data.data || []);
      }
    } catch (err) {
      console.error("Error fetching attendance:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats whenever records change
  useEffect(() => {
    const allRecords = records.flatMap(att => att.records || []);
    const total = allRecords.length || 1; // avoid division by zero

    const present = allRecords.filter(r => r.status === "present").length;
    const absent = allRecords.filter(r => r.status === "absent").length;
    const late = allRecords.filter(r => r.status === "late").length;
    const excused = allRecords.filter(r => r.status === "excused").length;

    setStats({
      totalPresent: present,
      totalAbsent: absent,
      totalLate: late,
      totalExcused: excused,
      average: ((present / total) * 100).toFixed(1)
    });
  }, [records]);

  // Fetch data on mount
  useEffect(() => {
    fetchAttendanceData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Attendance Reports & Listing</h1>
        <p className="text-gray-500 mb-6">View, analyze, and export attendance records</p>

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
        <div className="bg-white p-4 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
          <select value={batch} onChange={e => setBatch(e.target.value)} className="border rounded-lg px-3 py-2">
            <option value="">All Batches</option>
            {batches.map(b => <option key={b._id} value={b._id}>{b.batchName}</option>)}
          </select>

          <select value={course} onChange={e => setCourse(e.target.value)} className="border rounded-lg px-3 py-2">
            <option value="">All Courses</option>
            {courses.map(c => <option key={c._id} value={c.title}>{c.title}</option>)}
          </select>

          <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="border rounded-lg px-3 py-2"/>
          <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="border rounded-lg px-3 py-2"/>

          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border rounded-lg px-3 py-2">
            <option value="all">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
            <option value="excused">Excused</option>
          </select>
        </div>

        {/* Apply button */}
        <div className="flex gap-2 mb-4">
          <button onClick={fetchAttendanceData} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Apply Filters
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center">Loading attendance...</div>
          ) : records.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No records found</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Student Name</th>
                  <th className="px-4 py-3 text-left">Roll No</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Time</th>
                </tr>
              </thead>
              <tbody>
                {records.flatMap(att => att.records.map(rec => (
                  <tr key={rec._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{new Date(att.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{rec.studentId?.name}</td>
                    <td className="px-4 py-3">{rec.studentId?.rollNo}</td>
                    <td className="px-4 py-3 text-center">{rec.status}</td>
                    <td className="px-4 py-3 text-center">{rec.markedTime || "--:--"}</td>
                  </tr>
                )))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attenencetracking;

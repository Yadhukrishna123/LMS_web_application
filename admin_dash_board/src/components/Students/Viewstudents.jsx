import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt, FaSearch } from "react-icons/fa";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentStudents = filtered.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filtered.length / recordsPerPage);

  // Fetch students
  const getStudents = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/get_students");
      setStudents(res.data.students || []);
      setFiltered(res.data.students || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      setLoading(false);
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/v1/delete_student/${id}`);
      setStudents((prev) => prev.filter((s) => s._id !== id));
      setFiltered((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  // Search filter
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFiltered(
      students.filter(
        (s) =>
          s.name.toLowerCase().includes(value) ||
          s.email.toLowerCase().includes(value) ||
          s.course.toLowerCase().includes(value)
      )
    );
    setCurrentPage(1);
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">View Students</h1>

          <div className="relative w-full md:w-1/3">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-10 text-gray-600 text-lg">
            Loading students...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-10 text-gray-600 text-lg">
            No students found.
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Course</th>
                    <th className="p-3 text-left">Batch</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudents.map((student, index) => (
                    <tr
                      key={student._id}
                      className="border-t hover:bg-blue-50 transition"
                    >
                      <td className="p-3 font-medium text-gray-700">
                        {firstIndex + index + 1}
                      </td>
                      <td className="p-3">{student.name}</td>
                      <td className="p-3">{student.email}</td>
                      <td className="p-3">{student.course}</td>
                      <td className="p-3">{student.batch}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <p className="text-gray-600">
                Showing {firstIndex + 1}–
                {Math.min(lastIndex, filtered.length)} of {filtered.length}
              </p>

              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-500"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Prev
                </button>

                <span className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium">
                  {currentPage} / {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-500"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewStudents;

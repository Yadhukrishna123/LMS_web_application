import React, { useEffect, useState } from "react";
import { Search, User, Mail, Calendar, X } from "lucide-react";
import axios from "axios";

const StudentsEnrolledPage = () => {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const courseId = window.location.pathname.split("/").pop();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/courses/${courseId}/students`
        );
        setStudents(res.data.students || []);
        setFiltered(res.data.students || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students", error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, [courseId]);

  // Search Function
  useEffect(() => {
    if (!search) {
      setFiltered(students);
    } else {
      setFiltered(
        students.filter(
          (s) =>
            s.name?.toLowerCase().includes(search.toLowerCase()) ||
            s.email?.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, students]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl p-6 shadow">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Enrolled Students
        </h1>

        {/* Search Bar */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg w-full shadow-sm">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search student by name or email..."
              className="ml-3 bg-transparent w-full focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Loading */}
        {loading && <p className="text-center text-gray-600">Loading...</p>}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <p className="text-center text-gray-600 py-10">
            No students enrolled.
          </p>
        )}

        {/* Students Table */}
        {!loading && filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Student</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Enrolled On</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((student) => (
                  <tr key={student._id} className="border-t">
                    <td className="p-4 flex items-center gap-3">
                      <User className="w-8 h-8 bg-blue-100 p-2 rounded-full text-blue-500" />
                      <span className="font-semibold text-gray-700">
                        {student.name}
                      </span>
                    </td>

                    <td className="p-4 text-gray-600">{student.email}</td>

                    <td className="p-4 text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(student.enrolledAt).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Student Details Popup */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 relative">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Student Details
            </h3>

            <p className="flex items-center gap-3 text-gray-700 mb-2">
              <User className="w-5 h-5 text-blue-500" />
              {selectedStudent.name}
            </p>

            <p className="flex items-center gap-3 text-gray-700 mb-2">
              <Mail className="w-5 h-5 text-blue-500" />
              {selectedStudent.email}
            </p>

            <p className="flex items-center gap-3 text-gray-700">
              <Calendar className="w-5 h-5 text-blue-500" />
              Enrolled on:{" "}
              {new Date(selectedStudent.enrolledAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsEnrolledPage;

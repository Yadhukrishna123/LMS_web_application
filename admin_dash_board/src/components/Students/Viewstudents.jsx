import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      let res = await axios.get("http://localhost:8080/view_students");
      setStudents(res.data.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">All Students</h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-4 py-3">Student ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Enrolled Courses</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Batch</th>
              <th className="px-4 py-3">Registration Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{s.studentId}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <img
                    src={s.profileImage}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {s.name}
                </td>
                <td className="px-4 py-3">{s.email}</td>
                <td className="px-4 py-3">{s.phone}</td>
                <td className="px-4 py-3">{s.courseEnrolled}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      s.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {s.batch ? s.batch.batchName : "Not assigned"}
                </td>
                <td className="px-4 py-3">
                  {new Date(s.joinedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-center flex gap-2 justify-center">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStudents;

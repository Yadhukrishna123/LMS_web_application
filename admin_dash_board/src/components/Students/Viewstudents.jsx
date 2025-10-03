import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewStudents = () => {
  let [students, setStudents] = useState([]);

  const getAllStudents = async () => {
    try {
      let res = await axios.get("http://localhost:8080/api/v1/view_students");
      setStudents(res.data.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">All Students</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students &&
          students.map((student, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center"
            >
              {/* Profile Image */}
              <img
                src={student.profileImage || "https://via.placeholder.com/150"}
                alt={student.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
              />

              {/* Name & Course */}
              <h3 className="mt-4 text-lg font-bold text-gray-800">
                {student.name}
              </h3>
              <p className="text-sm text-gray-500">
                {student.courseEnrolled || "No course assigned"}
              </p>

              {/* Info Section */}
              <div className="mt-4 text-sm text-gray-700 space-y-1 text-center">
                <p>
                  <span className="font-medium">Email:</span> {student.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {student.phone}
                </p>
                {student.age && (
                  <p>
                    <span className="font-medium">Age:</span> {student.age}
                  </p>
                )}
                {student.gender && (
                  <p>
                    <span className="font-medium">Gender:</span>{" "}
                    {student.gender}
                  </p>
                )}
                {student.address && (
                  <p>
                    <span className="font-medium">Address:</span>{" "}
                    {student.address}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg shadow">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg shadow">
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ViewStudents;

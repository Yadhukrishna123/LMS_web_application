import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewInstuctors = () => {
  let [viewinstructor, setviewinstructor] = useState([]);
  const getAllinstructors = async () => {
    try {
      let res = await axios.get("http://localhost:8080/api/v1/view_instructor");
      //console.log(res.data.data);
      setviewinstructor(res.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllinstructors();
  }, []);
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
  <h2 className="text-2xl font-bold mb-6">All Instructors</h2>

  <div className="overflow-x-auto bg-white shadow-md rounded-lg">
    <table className="min-w-full divide-y divide-gray-200 border rounded-lg shadow-md">
      <thead className="bg-blue-100">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
            Profile
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
            Specialization
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
            Phone
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
            Experience
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
            Qualification
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
            Links
          </th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {viewinstructor &&
          viewinstructor.map((e, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {/* Profile Image */}
              <td className="px-6 py-4">
                <img
                  src={e.image}
                  alt={e.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                />
              </td>

              {/* Name */}
              <td className="px-6 py-4 font-medium text-gray-800">
                {e.name}
              </td>

              {/* Specialization */}
              <td className="px-6 py-4 text-gray-600">{e.specialization}</td>

              {/* Email */}
              <td className="px-6 py-4 text-gray-600">{e.email}</td>

              {/* Phone */}
              <td className="px-6 py-4 text-gray-600">{e.phone}</td>

              {/* Experience */}
              <td className="px-6 py-4 text-gray-600">{e.experience} yrs</td>

              {/* Qualification */}
              <td className="px-6 py-4 text-gray-600">{e.qualification}</td>

              {/* Links */}
              <td className="px-6 py-4 flex gap-2">
                {e.linkedin && (
                  <a
                    href={e.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    LinkedIn
                  </a>
                )}
                {e.github && (
                  <a
                    href={e.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-800 hover:underline text-sm"
                  >
                    GitHub
                  </a>
                )}
                {e.website && (
                  <a
                    href={e.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-600 hover:underline text-sm"
                  >
                    Website
                  </a>
                )}
              </td>

              {/* Actions */}
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

export default ViewInstuctors;

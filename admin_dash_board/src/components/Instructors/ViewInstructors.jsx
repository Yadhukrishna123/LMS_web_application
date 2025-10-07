import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSearch, FaChalkboardTeacher, FaPlus, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa'


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
     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl">
              <FaChalkboardTeacher className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Instructor Management</h2>
              <p className="text-gray-600">Manage and monitor all instructors</p>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                // value={search}
                placeholder="Search by name or specialization..."
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Stats & Add Button */}
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-2 rounded-xl border border-blue-200">
                <p className="text-sm text-gray-600">Total Instructors</p>
                <p className="text-2xl font-bold text-blue-600">{viewinstructor?.length || 0}</p>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-2">
                <FaPlus />
                Add Instructor
              </button>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h3 className="text-xl font-semibold text-white">All Instructors</h3>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Specialization
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Qualification
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Links
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {viewinstructor && viewinstructor.length > 0 ? (
                  viewinstructor.map((e, i) => (
                    <tr key={i} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                      {/* Instructor Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={e.image}
                            alt={e.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-300 shadow-md"
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{e.name}</p>
                            <p className="text-xs text-gray-500">{e.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Specialization */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full border border-purple-200">
                          {e.specialization}
                        </span>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-600">{e.phone}</p>
                      </td>

                      {/* Experience */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{e.experience}</span>
                          </div>
                          <span className="text-sm text-gray-600">years</span>
                        </div>
                      </td>

                      {/* Qualification */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">{e.qualification}</span>
                      </td>

                      {/* Links */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          {e.linkedin && (
                            <a
                              href={e.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition group"
                              title="LinkedIn"
                            >
                              <FaLinkedin className="group-hover:scale-110 transition" />
                            </a>
                          )}
                          {e.github && (
                            <a
                              href={e.github}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition group"
                              title="GitHub"
                            >
                              <FaGithub className="group-hover:scale-110 transition" />
                            </a>
                          )}
                          {e.website && (
                            <a
                              href={e.website}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition group"
                              title="Website"
                            >
                              <FaGlobe className="group-hover:scale-110 transition" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
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
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <FaChalkboardTeacher className="text-gray-400 text-2xl" />
                        </div>
                        <p className="text-gray-500 font-medium">No instructors found</p>
                        <p className="text-gray-400 text-sm">Try adjusting your search</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{viewinstructor?.length || 0}</span> of <span className="font-semibold text-gray-900">{viewinstructor?.length || 0}</span> instructors
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition">
                Previous
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ViewInstuctors;

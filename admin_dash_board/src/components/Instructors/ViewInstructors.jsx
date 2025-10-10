import React, { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import { FaEdit, FaTrash, FaSearch, FaChalkboardTeacher, FaPlus, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa'
import Delete from "../TableActions/Delete";
=======
import { FaEdit, FaTrash, FaSearch, FaChalkboardTeacher, FaPlus, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
>>>>>>> 9ed03048aa67943d6ce3867b34a7271126eb0e1c

const ViewInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

<<<<<<< HEAD
const ViewInstuctors = () => {
  let [viewinstructor, setviewinstructor] = useState([]);
  let [deleteClick, setDeleteClick] = useState(false)
  let [id, setId] = useState()
  const deleteCont = "Are you sure that you want to delete Instructor?"
  const getAllinstructors = async () => {
    try {
      let res = await axios.get("http://localhost:8080/api/v1/view_instructor");
      //console.log(res.data.data);
      setviewinstructor(res.data.data);
    } catch (error) { }
=======
  const getAllInstructors = async (page = 1) => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/view_instructor", {
        params: { page, limit: itemsPerPage, search }
      });
      setInstructors(res.data.data || []);
      setCurrentPage(res.data.page);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.totalItems);
    } catch (err) {
      console.error("Error fetching instructors:", err);
    }
>>>>>>> 9ed03048aa67943d6ce3867b34a7271126eb0e1c
  };

  // Fetch on initial load and when search changes
  useEffect(() => {
<<<<<<< HEAD
    getAllinstructors();
  }, []);
  const handleDelete = (id) => {
    setDeleteClick(true)
    setId(id)
    setviewinstructor((prev) => prev.filter((i) => i._id !== id))
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      {deleteClick && <Delete
        setDeleteClick={setDeleteClick}
        deleteCont={deleteCont}
        id={id}
        api_end_point="http://localhost:8080/api/v1/get_instructor"
      />}
=======
    setCurrentPage(1);
    getAllInstructors(1);
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
>>>>>>> 9ed03048aa67943d6ce3867b34a7271126eb0e1c
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl">
            <FaChalkboardTeacher className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Instructor Management</h2>
            <p className="text-gray-600">Manage and monitor all instructors</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or specialization..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-2 rounded-xl border border-blue-200">
              <p className="text-sm text-gray-600">Total Instructors</p>
              <p className="text-2xl font-bold text-blue-600">{totalItems}</p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-2">
              <FaPlus /> Add Instructor
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h3 className="text-xl font-semibold text-white">All Instructors</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Instructor</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Specialization</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Experience</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Qualification</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Links</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {instructors.length > 0 ? (
                  instructors.map((e, i) => (
                    <tr key={i} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img src={e.image} alt={e.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-300 shadow-md" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{e.name}</p>
                          <p className="text-xs text-gray-500">{e.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full border border-purple-200">{e.specialization}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap"><p className="text-sm text-gray-600">{e.phone}</p></td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{e.experience}</span>
                          </div>
                          <span className="text-sm text-gray-600">years</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-gray-700">{e.qualification}</span></td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                        {e.linkedin && <a href={e.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition group" title="LinkedIn"><FaLinkedin className="group-hover:scale-110 transition"/></a>}
                        {e.github && <a href={e.github} target="_blank" rel="noreferrer" className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition group" title="GitHub"><FaGithub className="group-hover:scale-110 transition"/></a>}
                        {e.website && <a href={e.website} target="_blank" rel="noreferrer" className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition group" title="Website"><FaGlobe className="group-hover:scale-110 transition"/></a>}
                      </td>
<<<<<<< HEAD

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
                            <FaTrash className="group-hover:scale-110 transition" onClick={() => handleDelete(e._id)} />
                          </button>
                        </div>
=======
                      <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-2">
                        <button className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition group"><FaEdit className="group-hover:scale-110 transition"/></button>
                        <button className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition group"><FaTrash className="group-hover:scale-110 transition"/></button>
>>>>>>> 9ed03048aa67943d6ce3867b34a7271126eb0e1c
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
          {totalPages > 1 && (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-600">Showing page {currentPage} of {totalPages}</div>
              <div className="flex gap-2">
                <button disabled={currentPage === 1} onClick={() => getAllInstructors(currentPage - 1)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition">Previous</button>
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} onClick={() => getAllInstructors(i + 1)} className={`px-4 py-2 border rounded-lg text-sm font-medium ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border-gray-300 text-gray-700'} hover:bg-white transition`}>{i + 1}</button>
                ))}
                <button disabled={currentPage === totalPages} onClick={() => getAllInstructors(currentPage + 1)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition">Next</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewInstructors;

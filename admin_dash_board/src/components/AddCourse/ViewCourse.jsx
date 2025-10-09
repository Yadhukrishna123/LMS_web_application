import React, { useEffect, useState } from 'react';
import axios from "axios";
import { FaEdit, FaTrash, FaSearch, FaBook, FaPlus } from 'react-icons/fa';

const ViewCourses = () => {
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    const getAllCourses = async (page = 1) => {
        try {
            const res = await axios.get("http://localhost:8080/api/v1/get_all_courses", {
                params: {
                    title: search,
                    page,
                    limit: itemsPerPage,
                },
            });
            setCourses(res.data.data || []);
            setCurrentPage(res.data.page);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const truncateText = (text, maxLength = 50) => {
        if (!text) return "";
        return text.length <= maxLength ? text : text.substring(0, maxLength) + '...';
    };

    useEffect(() => {
        setCurrentPage(1);
        getAllCourses(1);
    }, [search]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
            <div className="w-full max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl">
                            <FaBook className="text-white text-2xl" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Course Management</h2>
                            <p className="text-gray-600">Manage all courses and content</p>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            placeholder="Search by title..."
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-2 rounded-xl border border-blue-200">
                            <p className="text-sm text-gray-600">Total Courses</p>
                            <p className="text-2xl font-bold text-blue-600">{courses?.length || 0}</p>
                        </div>
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg flex items-center gap-2">
                            <FaPlus /> Add Course
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                        <h3 className="text-xl font-semibold text-white">All Courses</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Course</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Duration</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Level</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Instructor</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {courses && courses.length > 0 ? courses.map((e, i) => (
                                    <tr key={i} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                                        <td className="px-6 py-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">{e.title.charAt(0)}</div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-gray-900">{e.title}</p>
                                                    <p className="text-xs text-gray-500 mt-1" title={e.description}>{truncateText(e.description, 60)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">${e.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{e.duration}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                                e.level === 'Beginner' ? 'bg-green-100 text-green-700 border border-green-200'
                                                : e.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                                                : 'bg-red-100 text-red-700 border border-red-200'
                                            }`}>{e.level}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{e.instructor}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full border border-blue-200">{e.category}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition"><FaEdit /></button>
                                                <button className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"><FaTrash /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <FaBook className="text-gray-400 text-2xl" />
                                                </div>
                                                <p className="text-gray-500 font-medium">No courses found</p>
                                                <p className="text-gray-400 text-sm">Try adjusting your search</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                            <div className="text-sm text-gray-600">
                                Showing page {currentPage} of {totalPages}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition"
                                    disabled={currentPage === 1}
                                    onClick={() => getAllCourses(currentPage - 1)}
                                >Previous</button>

                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => getAllCourses(i + 1)}
                                        className={`px-4 py-2 border rounded-lg text-sm font-medium ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border-gray-300 text-gray-700'} hover:bg-white transition`}
                                    >{i + 1}</button>
                                ))}

                                <button
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition"
                                    disabled={currentPage === totalPages}
                                    onClick={() => getAllCourses(currentPage + 1)}
                                >Next</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewCourses;

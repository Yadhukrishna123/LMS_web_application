import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 4;

  // Mapping category names to ObjectId if needed
  const categoryMap = {
    Programming: "68e4d54b1e00eefc08aa513b",
    Designing: "68da6c575f0ebd044bf2f05a",
    Marketing: "68da6b585f0ebd044bf2f058",
  };

  const getAllCourses = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/get_all_courses`, {
        withCredentials: true
      });



      setCourses(res.data.data);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, [search, category, price, duration, currentPage]);

  const handleClearFilter = () => {
    setSearch("");
    setCategory("");
    setPrice("");
    setDuration("");
    setCurrentPage(1);
  };

  return (
    <div className="px-4 md:px-12 lg:px-24 py-12 bg-gray-100 min-h-screen">
      <h3 className="text-4xl font-semibold mb-8 text-center">Courses</h3>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title or instructor"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">All Categories</option>
          <option value="Programming">Programming</option>
          <option value="Designing">Designing</option>
          <option value="Marketing">Marketing</option>
        </select>

        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">All Prices</option>
          <option value="1-1000">₹1-1000</option>
          <option value="1000-2000">₹1000-2000</option>
          <option value="2000-3000">₹2000-3000</option>
        </select>

        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">All Durations</option>
          <option value="Short">&lt; 2 months</option>
          <option value="Medium">3–4 months</option>
          <option value="Long">6–12 months</option>
        </select>
      </div>

      <button
        onClick={handleClearFilter}
        className="text-sm text-purple-600 hover:underline mb-8"
      >
        Clear All Filters
      </button>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.length > 0 ? (
          courses.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
            >
              <Link to={`/detailpage/${c._id}`}>
                <img
                  src={c.image?.[0] || "/placeholder_course.jpg"}
                  alt={c.title}
                  onError={(e) => (e.target.src = "/placeholder_course.jpg")}
                  className="w-full h-[250px] object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-1">{c.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Instructor: {c.instructorDetails?.name || "TBA"}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    Level: {c.level} | Duration: {c.duration}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {c.tags &&
                      c.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-purple-200 text-purple-700 rounded-full px-2 py-1 text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>

                  <p className="text-sm text-gray-700 mb-3 flex-grow">
                    {c.description}
                  </p>

                  <div className="flex justify-between items-center mt-auto">
                    <span className="font-bold text-gray-800">₹{c.price}</span>
                    <button className="py-1 bg-purple-500 text-white rounded px-3">
                      Enroll
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 mt-6">
            No courses found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center border-t border-white/10 px-4 py-3 sm:px-6 mt-8">
        <div className="flex space-x-1">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`min-w-9 rounded-md py-2 px-3 text-sm text-center transition-all ml-2
                ${currentPage === i + 1
                  ? "bg-slate-800 text-white border border-transparent shadow-md hover:shadow-lg"
                  : "border border-slate-300 text-slate-600 shadow-sm hover:shadow-lg hover:text-white hover:bg-slate-800 hover:border-slate-800"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;

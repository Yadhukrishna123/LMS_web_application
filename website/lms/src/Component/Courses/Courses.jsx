import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const CoursesPage = () => {
  const location = useLocation();
  // const showFilters = location.pathname === "/allcourses";

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of items per page

  const getAllCourse = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8080/Admin_view_All_courses?title=${search}&category=${category}&price=${price}`
      );

      //console.log(res);
      setCourses(res.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllCourse();
  }, [search, category, price]);

  const handleClearFilter = () => {
    setSearch("");
    setCategory("");
    setPrice("");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-4 md:px-12 lg:px-24 py-12 bg-gray-100 min-h-screen">
      <h3 className="text-4xl font-semibold mb-2 text-center mb-3 ">Courses</h3>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder=" Search by title or instructor"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value=""> All Categories</option>
            <option value="Programming">Programming</option>
            <option value="designing">designing</option>
            <option value="Marketing">Marketing</option>
          </select>

          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value=""> All Prices</option>
            <option value="1-1000">₹1-1000</option>
            <option value="1000-2000">₹1000-2000</option>
            <option value="2000–₹3000">₹2000 – ₹3000</option>
          </select>

          <select
            // value={durationFilter}
            // onChange={(e) => setDurationFilter(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value=""> All Durations</option>
            <option value="Short">Short (&lt; 2 months)</option>
            <option value="Medium">Medium (3–4 months)</option>
            <option value="Long">Long (6–12 months)</option>
          </select>
        </div>

        <button
          onClick={handleClearFilter}
          className="text-sm text-purple-600 hover:underline mb-8"
        >
          Clear All Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {currentItems &&
          currentItems.map((c, i) => {
            return (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <Link to={`/detailpage/${c._id}`}>
                  <img
                    src={c.image && c.image[0]}
                    alt={c.title}
                    className="w-[100%] h-[250px]"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-1">{c.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      Instructor: {c.instructorDetails?.name}
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
                    <div className="flex  justify-between items-center mt-auto">
                      <div>
                        <span className="font-bold text-gray-800">
                          price : {c.price}
                        </span>
                      </div>
                      <div>
                        <button className="py-1 bg-purple-500 text-white rounded p-3">
                          Enroll
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
      <div className="flex items-center justify-center border-t border-white/10 px-4 py-3 sm:px-6">
        <div className="flex space-x-1">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`min-w-9 rounded-md py-2 px-3 text-center text-sm transition-all ml-2 
          ${
            currentPage === i + 1
              ? "bg-slate-800 text-white border border-transparent shadow-md hover:shadow-lg focus:bg-slate-700 active:bg-slate-700"
              : "border border-slate-300 text-slate-600 shadow-sm hover:shadow-lg hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800"
          }
        `}
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

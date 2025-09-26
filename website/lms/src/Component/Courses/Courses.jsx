import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const CoursesPage = () => {


  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [durationFilter, setDurationFilter] = useState("");




  const getAllCourse = async () => {
    let res = await axios.get(`http://localhost:8080/get_All_courses?title=${search}&category=${category}&price=${price}`)
    console.log(res);
    setCourses(res.data.data)

  }

  useEffect(() => {
    getAllCourse()
  }, [search, category, price]);

  const handleClearFilter = () => {
    setSearch("")
    setCategory("")
    setPrice("")
  }


  return (
    <div className="px-4 md:px-12 lg:px-24 py-12 bg-gray-100 min-h-screen">
      {showFilters && (
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
            <option value="Designing">Design</option>
            <option value="Marketing">Marketing</option>
          </select>

          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value=""> All Prices</option>
            <option value="1-1000">₹1 – ₹1000</option>
            <option value="1000-2000">₹1000 – ₹2000</option>
            <option value="2000-3000">₹2000 – ₹3000</option>
          </select>


          <select
            value={durationFilter}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto">

        {courses && courses.map((c, i) => {
          return (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <img
                src={c.image}

                className="w-full h-[200px] mx-auto"

              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-1">{c.title}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  {c.instructor}
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  {c.level} | {c.duration}
                </p>


                <div className="flex flex-wrap gap-1 mb-2">

                  <span

                    className="bg-purple-200 text-purple-700 rounded-full px-2 py-1 text-xs font-semibold"
                  >
                    {c.category}
                  </span>

                </div>


                <p className="text-sm text-gray-700 mb-3 flex-grow">
                  {c.description}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <div>
                    <span className="font-bold text-gray-800">
                      {c.price}
                    </span>
                  </div>

                  <div>
                    <button className="py-1 text-white font-bold bg-purple-500 rounded">Enroll</button>
                  </div>

                </div>
              </div>
            </div>
          )
        })}







      </div>
    </div>
  );
};

export default CoursesPage;

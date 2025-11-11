import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");


  const getAllCourses = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/get_all_courses`, {
        withCredentials: true
      });
      console.log(res)
      setCourses(res.data.courses);


    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, [search, category, price, duration,]);

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

      <CourseCard courses={courses} />


    </div>
  );
};

export default CoursesPage;

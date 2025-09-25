import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const CoursesPage = () => {
  const location = useLocation();
  const showFilters = location.pathname === "/allcourses";

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/courses")
      .then((res) => {
        setCourses(res.data);
        setFilteredCourses(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let filtered = [...courses];

    if (search.trim()) {
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.instructor.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(
        (course) => Array.isArray(course.tags) && course.tags.includes(category)
      );
    }

    if (priceFilter === "Free") {
      filtered = filtered.filter((c) => c.price === 0);
    } else if (priceFilter === "Paid") {
      filtered = filtered.filter((c) => c.price > 0);
    } else if (priceFilter === "Range") {
      filtered = filtered.filter((c) => c.price >= 0 && c.price <= 5000);
    }

    if (durationFilter === "Short") {
      filtered = filtered.filter((c) => {
        const dur = parseInt(c.duration);
        return dur > 0 && dur < 2;
      });
    } else if (durationFilter === "Medium") {
      filtered = filtered.filter((c) => {
        const dur = parseInt(c.duration);
        return dur >= 3 && dur <= 4;
      });
    } else if (durationFilter === "Long") {
      filtered = filtered.filter((c) => {
        const dur = parseInt(c.duration);
        return dur >= 6 && dur <= 12;
      });
    }

    setFilteredCourses(filtered);
  }, [search, category, priceFilter, durationFilter, courses]);

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
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value=""> All Prices</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
              <option value="Range">₹0 – ₹5000</option>
            </select>

            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value=""> All Durations</option>
              <option value="Short">Short (&lt; 2 months)</option>
              <option value="Medium">Medium (3–4 months)</option>
              <option value="Long">Long (6–12 months)</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSearch("");
              setCategory("");
              setPriceFilter("");
              setDurationFilter("");
            }}
            className="text-sm text-purple-600 hover:underline mb-8"
          >
            Clear All Filters
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <Link to={`/detailpage/${course._id}`}
            key={course._id}
            className="block hover:shadow-lg transition rounded-lg"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <img
                src={
                  course.image?.[0]?.startsWith("http")
                    ? course.image[0]
                    : `http://localhost:8080/images/${course.image?.[0]}`
                }
                alt={course.title}
                className="w-full h-48 object-cover"
                onError={(e) => (e.target.src = "/placeholder.png")}
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  Instructor: {course.instructor}
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  Level: {course.level} | Duration: {course.duration}
                </p>

                {Array.isArray(course.tags) && course.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {course.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-purple-200 text-purple-700 rounded-full px-2 py-1 text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-sm text-gray-700 mb-3 flex-grow">
                  {course.desc}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="font-bold text-gray-800">
                    {course.price > 0 ? `$${course.price}` : "Free"}
                  </span>
                  <span className="text-yellow-500 font-semibold">
                    {course.rating?.toFixed(1) || "0"} ★
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;

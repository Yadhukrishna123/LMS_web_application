import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Detailpage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/courses/${id}`)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Course not found or server error");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <div className="text-center mt-20 text-lg font-semibold">Loading...</div>;

  if (error)
    return (
      <div className="text-center mt-20 text-red-500 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen m-3">
      {/* Images */}
      <div className="mb-6">
        {course.image?.map((img, idx) => (
          <img
            key={idx}
            src={img.startsWith("http") ? img : `http://localhost:8080/images/${img}`}
            alt={`Course ${idx + 1}`}
            className="w-full h-80 object-cover rounded"
          />
        ))}
      </div>

      {/* Course Info */}
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

      <p className="text-gray-700 mb-2">
        Instructor: <span className="font-medium">{course.instructor}</span> | Level:{" "}
        <span className="font-medium">{course.level}</span> | Duration:{" "}
        <span className="font-medium">{course.duration}</span>
      </p>

      <p className="text-yellow-500 font-semibold mb-4">
        {course.rating?.toFixed(1) || 0} ★ ({course.totalReviews || 0} reviews)
      </p>

      <p className="text-gray-800 mb-4">{course.desc}</p>

      <p className="text-2xl font-bold mb-6">
        {course.price > 0 ? `$${course.price}` : "Free"}
      </p>

      <div className="flex gap-4">
        <button className="bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600">
          Enroll Now
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 text-gray-800 px-6 py-3 rounded hover:bg-gray-400"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Detailpage;

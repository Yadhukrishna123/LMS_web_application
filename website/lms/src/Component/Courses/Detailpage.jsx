import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AllCourseDetail } from "../AllCourseContext/Context";
import { useContext } from "react";

const Detailpage = () => {
  const { sentDataToCheckoutPage } = useContext(AllCourseDetail)
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/v1/get_course/${id}`)
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
    return (
      <div className="text-center mt-20 text-lg font-semibold">Loading...</div>
    );

  if (error)
    return (
      <div className="text-center mt-20 text-lg font-semibold text-red-500">
        {error}
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Course Banner */}
      <div className="mb-6">
        {Array.isArray(course.image) ? (
          course.image.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Course ${idx + 1}`}
              className="w-full h-80 object-cover rounded mb-4"
            />
          ))
        ) : (
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-80 object-cover rounded mb-4"
          />
        )}
      </div>

      {/* Title & Info */}
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-2">{course.overview}</p>

      <div className="flex flex-wrap gap-4 text-gray-700 mb-4">
        <span>
          <strong>Instructor:</strong>{" "}
          {course.instructorDetails?.name || "Unknown"}
        </span>
        <span>
          <strong>Level:</strong> {course.level}
        </span>
        <span>
          <strong>Duration:</strong> {course.duration}
        </span>
      </div>

      <p className="text-xl font-semibold text-green-700 mb-6">
        {course.isFree
          ? "Free"
          : course.pricing?.discount
            ? `₹${course.pricing.discount} (Original: ₹${course.price})`
            : `₹${course.price}`}
      </p>

      {/* Tags */}
      {course.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {course.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Curriculum */}
      <div className="bg-white shadow rounded p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Curriculum</h2>
        {course.modules?.length > 0 ? (
          course.modules.map((mod, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="font-semibold text-lg mb-2">{mod.name}</h3>
              <ul className="pl-4 list-disc text-gray-700">
                {mod.lessons.map((lesson, i) => (
                  <li key={i} className="mb-1">
                    <span className="font-medium">{lesson.title}</span> —{" "}
                    {lesson.type} ({lesson.duration}){" "}
                    {lesson.accessType === "Free" && (
                      <span className="text-green-600">(Preview)</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No modules added yet.</p>
        )}
      </div>

      {/* Instructor */}
      <div className="bg-white shadow rounded p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Instructor</h2>
        {course.instructorDetails ? (
          <div className="flex items-center gap-4">
            <img
              src={course.instructorDetails?.image}
              alt={course.instructorDetails.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">{course.instructorDetails.name}</h3>
              <p className="text-gray-600">{course.instructorDetails.bio}</p>
              <div className="flex gap-3 mt-2 text-purple-600">
                {course.instructorDetails.linkedin && (
                  <a
                    href={course.instructorDetails.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                )}
                {course.instructorDetails.twitter && (
                  <a
                    href={course.instructorDetails.twitter}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Twitter
                  </a>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>No instructor info available.</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <Link to={`/checkout/${course._id}`}>
          <button
            onClick={(sentDataToCheckoutPage(course))}
            className="bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600">

            Enroll Now
          </button>
        </Link>
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

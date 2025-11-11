import React from 'react'
import { Link } from 'react-router-dom'

const CourseCard = ({courses}) => {
  return (
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
                    <span className="font-bold text-gray-800">₹{c.price || "Free"}</span>
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
  )
}

export default CourseCard
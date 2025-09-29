import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewInstuctors = () => {
  let [viewinstructor, setviewinstructor] = useState([]);
  const getAllinstructors = async () => {
    try {
      let res = await axios.get("http://localhost:8080/view_instructor");
      //console.log(res.data.data);
      setviewinstructor(res.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllinstructors();
  }, []);
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">All instructors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {viewinstructor &&
            viewinstructor.map((e, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center"
              >
                {/* Profile Image */}
                <img
                  src={e.image}
                  alt={e.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                />

                {/* Name & Role */}
                <h3 className="mt-4 text-lg font-bold text-gray-800">
                  {e.name}
                </h3>
                <p className="text-sm text-gray-500">{e.specialization}</p>

                {/* Info Section */}
                <div className="mt-4 text-sm text-gray-700 space-y-1 text-center">
                  <p>
                    <span className="font-medium">Email:</span> {e.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {e.phone}
                  </p>
                  <p>
                    <span className="font-medium">Experience:</span>{" "}
                    {e.experience} years
                  </p>
                  <p>
                    <span className="font-medium">Qualification:</span>{" "}
                    {e.qualification}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 mt-4">
                  {e.linkedin && (
                    <a
                      href={e.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      LinkedIn
                    </a>
                  )}
                  {e.github && (
                    <a
                      href={e.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-800 hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                  {e.website && (
                    <a
                      href={e.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      Website
                    </a>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg shadow">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg shadow">
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

  );
};

export default ViewInstuctors;

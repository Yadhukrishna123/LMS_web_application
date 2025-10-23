import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";

const MyProfile = () => {
  let [profile, setProfile] = useState([])

  const getProfile = async () => {
    let res = await axios.get("http://localhost:8080/api/v1/get_profile_details", {
      withCredentials: true
    })
    setProfile(res.data.profile)
    console.log(res);

  }
  useEffect(() => {
    getProfile()
  }, [])
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Top Header with Button */}
      <div className="flex justify-between items-center max-w-4xl mx-auto mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Institute Profile</h2>
        {profile === "" ? (
          <Link to="/create_profile">
            <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition">
              + Create Profile
            </button>
          </Link>
        ) : null}
      </div>
        {/* $$$% */}
      {/* Profile Card */}
      {profile &&
        profile.map((p, i) => {
          return (
            <div
              key={i}
              className="relative max-w-4xl w-full mx-auto bg-white shadow-lg rounded-2xl overflow-hidden"
            >
              {/* Edit Icon */}
              <Link to={`/edit_profile/${p._id}`}>
                <button className="absolute top-4 right-4 text-green-600 hover:text-green-800 transition">
                  <FaEdit size={22} />
                </button>
              </Link>

              {/* Header with Logo & Name */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 border-b">
                <img
                  src={p.image}
                  alt="Institute Logo"
                  className="w-32 h-32 object-cover rounded-xl border shadow-md"
                />
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {p.instituteName}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Empowering students with knowledge & innovation.
                  </p>
                  <span className="mt-2 inline-block px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
                    Accredited by AICTE
                  </span>
                </div>
              </div>

              {/* Body Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Institute Details
                  </h2>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      <span className="font-medium">Address:</span> {p.address}
                    </li>
                    <li>
                      <span className="font-medium">Email:</span> {p.email}
                    </li>
                    <li>
                      <span className="font-medium">Phone:</span> {p.phome}
                    </li>
                    <li>
                      <span className="font-medium">Website:</span>{" "}
                      <a
                        href={p.website}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {p.website}
                      </a>
                    </li>
                    <li>
                      <span className="font-medium">GSTIN:</span> {p.gstin}
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Additional Information
                  </h2>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      <span className="font-medium">Founded:</span> {p.founded}
                    </li>
                    <li>
                      <span className="font-medium">Courses Offered:</span>{" "}
                      {p.courses}
                    </li>
                    <li>
                      <span className="font-medium">Student Strength:</span>{" "}
                      {p.students}
                    </li>
                    <li>
                      <span className="font-medium">Placement Rate:</span>{" "}
                      {p.placement}
                    </li>
                    <li>
                      <span className="font-medium">Facilities:</span>{" "}
                      {p.accreditation}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-100 px-6 py-4 text-center text-gray-500 text-sm">
                © 2025 ABC Institute of Technology. All rights reserved.
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default MyProfile
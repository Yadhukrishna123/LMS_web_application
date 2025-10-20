import React from 'react'
import { FaPen, FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const UserPage = () => {
    return (
        <div className="px-4 sm:px-6 lg:px-20 py-10 bg-gray-50 min-h-screen">

            <div className="w-[85%] mx-auto bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* photo */}
                <div className="flex-shrink-0">
                    <FaUserCircle className="text-gray-400" size={120} />
                </div>


                <div className="flex-1 flex flex-col  text-center sm:text-left mt-4 ml-10">

                    <div className='flex'>
                        <div>
                            <h2 className="text-2xl font-bold">John Doe</h2>
                        </div>
                        <div className='ml-5 mt-2'>
                            <FaPen style={{ cursor: "pointer" }} color='green' />
                        </div>
                    </div>
                    <p className="text-gray-500">johndoe@example.com</p>
                    <p className="text-gray-500 mt-1">Member since: Jan 2023</p>

                    <Link to="/add_student_details">
                        <button>Add student details</button>

                    </Link>
                   
                </div>
            </div>

            {/* Purchased Courses */}
            <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4">My Courses</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Example Course Card */}
                    <div className="bg-white rounded-xl shadow p-4">
                        <img
                            src="https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/college-student-YCNL3GU-1.png"
                            alt="Course Thumbnail"
                            className="rounded-lg w-full h-40 object-cover"
                        />
                        <h4 className="mt-3 text-lg font-semibold">React for Beginners</h4>
                        <p className="text-gray-500 text-sm">Progress: 65%</p>
                        <button className="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Continue Learning
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow p-4">
                        <img
                            src="https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/students-and-teacher-RVRHBBJ-1.png"
                            alt="Course Thumbnail"
                            className="rounded-lg w-full h-40 object-cover"
                        />
                        <h4 className="mt-3 text-lg font-semibold">Node.js Masterclass</h4>
                        <p className="text-gray-500 text-sm">Progress: 20%</p>
                        <button className="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Continue Learning
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow p-4">
                        <img
                            src="https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/girl-in-college-MGZDENU-1.png"
                            alt="Course Thumbnail"
                            className="rounded-lg w-full h-40 object-cover"
                        />
                        <h4 className="mt-3 text-lg font-semibold">MongoDB Deep Dive</h4>
                        <p className="text-gray-500 text-sm">Progress: 100% (Completed)</p>
                        <button className="mt-3 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            Review Course
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPage
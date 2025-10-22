import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { FaPen, FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AllCourseDetail } from '../AllCourseContext/Context'
import AddStudent from '../AddStudentDetails/AddStudent'

const UserPage = () => {
    const { user } = useContext(AllCourseDetail)
    const [showForm, setShowForm] = useState(false)
    const [usercourse, setUserCourse] = useState([])
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState(null)
    const [userBuyedCourse, setUserBuyedCourse] = useState([])
    const studentEnrolledCourse = async () => {
        try {
            setLoading(true)
            let res = await axios.get("http://localhost:8080/api/v1/get_all_payment_details")
            console.log(res)
            setUserCourse(res.data.paymentDetails)
        } catch (error) {

        } finally {
            setLoading(false)

        }
    }

    useEffect(() => {
        studentEnrolledCourse()
        if (user?.email) {
            setEmail(user.email);
        }
    }, [user])
    const userCourses = usercourse.filter((c) => c.userEmail === email)
    const courses = userCourses.map((c, i)=>{
        return(
            <div className="bg-white rounded-xl shadow p-4" key={i}>
                        <img
                            src="https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/college-student-YCNL3GU-1.png"
                            alt="Course Thumbnail"
                            className="rounded-lg w-full h-40 object-cover"
                        />
                        <h4 className="mt-3 text-lg font-semibold">{c.courseName}</h4>
                        <p className="text-gray-500 text-sm">Progress: 65%</p>
                        <button className="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Continue Learning
                        </button>
                    </div>
        )
    })
    console.log("userCourses", userCourses)
    
    console.log(email)
    console.log(usercourse)
    return (
        <div className="px-4 sm:px-6 lg:px-20 py-10 bg-gray-50 min-h-screen">
            {showForm && <AddStudent setShowForm={setShowForm} emailll={email} />}

            <div className="w-[85%] mx-auto bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 border border-gray-100">
                {/* photo */}
                <div className="flex-shrink-0 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <FaUserCircle className="text-gray-300 relative z-10" size={120} />
                </div>

                <div className="flex-1 flex flex-col text-center sm:text-left sm:ml-6">
                    <div className='flex items-center justify-center sm:justify-start gap-3 mb-2'>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                          {`${user?.firstname} ${user?.lastname}`}
                        </h2>
                        <button
                            className="p-2 hover:bg-green-50 rounded-full transition-colors duration-200 group"
                            aria-label="Edit profile"
                        >
                            <FaPen className="text-green-600 group-hover:scale-110 transition-transform" size={16} />
                        </button>
                    </div>

                    <div className="space-y-2 mb-6">
                        <p className="text-gray-600 flex items-center justify-center sm:justify-start gap-2">
                            <span className="text-blue-500">✉</span>
                            {user?.email}

                        </p>
                        <p className="text-gray-500 text-sm flex items-center justify-center sm:justify-start gap-2">
                            <span>📅</span>
                            Member since Jan 2023
                        </p>
                    </div>


                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        onClick={() => setShowForm(true)}
                    >
                        Add Student Details
                    </button>

                </div>
            </div>

            {/* Purchased Courses */}
            <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4">My Courses</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Example Course Card */}
                    
                        {courses}
                    {/* <div className="bg-white rounded-xl shadow p-4">
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
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default UserPage
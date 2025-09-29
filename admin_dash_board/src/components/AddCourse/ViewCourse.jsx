import React, { useEffect, useState } from 'react'
import axios from "axios"


const AdminViewCourses = () => {
    let [viewcourse, setviewcourse] = useState([])
    const getAllCourses = async () => {
        try {
            let res = await axios.get("http://localhost:8080/Admin_view_All_courses")
            console.log(res.data.data);
            setviewcourse(res.data.data)


        } catch (error) {

        }
    }

    useEffect(() => {
        getAllCourses()
    }, [])
    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">All Courses</h2>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Duration
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Level
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Instructor
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Tools
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {viewcourse && viewcourse.map((e, i) => (
                            <tr key={i} className="hover:bg-blue-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                    {e.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                    {e.description}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                    {e.price}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                    {e.duration}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                    {e.level}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                    {e.instructor}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                    {e.category}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-800 flex gap-2">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded transition duration-200">
                                        Edit
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded transition duration-200">
                                        Delete
                                    </button>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminViewCourses
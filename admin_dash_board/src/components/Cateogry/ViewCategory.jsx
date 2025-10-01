import React, { useEffect, useState } from 'react'
import axios from "axios"


const ViewCategory = () => {
    let [viewcourse, setviewcourse] = useState([])
    const getAllCourses = async () => {
        try {
            let res = await axios.get("http://localhost:8080/view_All_categories")
            //console.log(res.data.data);
            setviewcourse(res.data.data)


        } catch (error) {

        }
    }

    useEffect(() => {
        getAllCourses()
    }, [])
    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">All Courses Category</h2>
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
                                Images
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
                                     <img src={e.image} alt={e.title} className="w-16 h-16 rounded" />
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

export default ViewCategory
import React, { useEffect, useState } from 'react'
import axios from "axios"


const UserEnquiries = () => {
    let [enquiry, setEnquiry] = useState([])
    const getAllEnquiries = async () => {
        try {
            let res = await axios.get("http://localhost:8080/api/v1/getAll_enquiry")
            console.log(res.data.data);
            setEnquiry(res.data.data)


        } catch (error) {

        }
    }

    useEffect(() => {
        getAllEnquiries()
    }, [])
    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">User Enquiries</h2>


            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Message
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Name
                            </th>


                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {enquiry && enquiry.map((e, i) => {
                            return (
                                <tr className="hover:bg-blue-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                        {e.createdAt}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                        {e.email}
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">
                                        {e.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                        {e.message}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span>


                                            status
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}



                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserEnquiries
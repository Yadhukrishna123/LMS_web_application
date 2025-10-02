import React, { useEffect, useState } from 'react'
import axios from "axios"


const Users = () => {
    let [users, setUsers] = useState([])
    let [search, setSearch] = useState("")

    const getAllUsers = async () => {
        let res = await axios.get(`http://localhost:8080/api/v1/get_all_user?firstname=${search}`)
        console.log(res);
        setUsers(res.data.user)
    }

    useEffect(() => {
        getAllUsers()
    }, [search])
    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold">Users</h2>
            <div className="flex items-center justify-between mt-5 mb-6">

                <div>
                    <input
                        className='w-[100%] border-gray-200'
                        type="text"
                        value={search}
                        placeholder='Search by name'
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow">
                    + Add User
                </button>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                No
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                                Role
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                                Edit
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">

                        {users && users.map((u, i) => {
                            return (
                                <tr key={i} className="hover:bg-blue-50 transition-colors">
                                    <td className="px-6 py-4 text-gray-800">{i + 1}</td>
                                    <td className="px-6 py-4 text-gray-800">{`${u.firstname} ${u.lastname}`}</td>
                                    <td className="px-6 py-4 text-gray-800">{u.email}</td>
                                    <td className="px-6 py-4 text-gray-800">{u.phone}</td>
                                    <td className="px-6 py-4 text-gray-800">{u.role}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="px-3 py-1 border border-green-200 rounded-md text-sm hover:bg-green-50">
                                            Edit
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button

                                            className="px-3 py-1 border border-red-200 text-red-600 rounded-md hover:bg-red-50 text-sm"
                                        >
                                            Delete
                                        </button>
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

export default Users
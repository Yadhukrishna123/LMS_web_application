import React, { useContext, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AllCourseDetail } from '../AllCourseContext/Context';
import axios from 'axios';

const Logout = ({ setLogout }) => {
    const navigate = useNavigate()
    const { setUser } = useContext(AllCourseDetail)

    const handleLogout = async () => {
        let res = await axios.post("http://localhost:8080/api/v1/logout", {}, {
            withCredentials: true
        })
        console.log(res);
        if (res.data.success) {
            setUser(null)
            setLogout(false),
                toast.success("successfully logged out")
            navigate("/login")
        }

    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ToastContainer />
            <div
                className="absolute inset-0 bg-black/50"
            />


            <div className="relative z-10 w-full max-w-md mx-4 bg-white rounded-2xl shadow-xl">
                <div className="p-6">

                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Confirm Logout</h2>
                        <button >
                            <IoMdClose size={24}
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => authentication(false)}
                            />
                        </button>
                    </div>


                    <p className="mt-4 text-gray-600">
                        Are you sure you want to log out of your account?
                    </p>


                    <div className="mt-6 flex justify-end gap-2">
                        <button
                            onClick={() => setLogout(false)}
                            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button

                            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                            onClick={() => handleLogout()}

                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};




export default Logout
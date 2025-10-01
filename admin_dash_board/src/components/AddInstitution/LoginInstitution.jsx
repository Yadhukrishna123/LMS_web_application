import React, { useState } from 'react'
import axios from "axios"
import { AdminContext } from '../AdminContext/Context'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';



const LoginInstitution = () => {
    const { isAdminLogedIn } = useContext(AdminContext)
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        email: "",
        password: "",

    })
    const handleInput = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            let res = await axios.post("http://localhost:8080/login_institute", {
                email: inputs.email,
                password: inputs.password
            })
            console.log(res);
            if (res.data.success) {
                if (res.data.isAuthentication) {
                    isAdminLogedIn(res.data.isAuthentication)
                    navigate("/my_profile")
                }
            }

        } catch (error) {

        }

    }

    console.log(inputs);

    return (
        <>
            <div className=" flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl flex overflow-hidden">

                    {/* Left Side - Image */}
                    <div className="w-[40%] bg-gray-100 flex items-center justify-center p-10">
                        <img
                            src="https://res.cloudinary.com/dnqlt6cit/image/upload/v1759216251/bextfn8k3unismqm5bz2.jpg"
                            alt="Vyapar Logo"
                            className="w-[100%] h-60 object-contain"
                        />
                    </div>

                    {/* Right Side - Form */}
                    <div className="w-[60%] p-10  flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-6">LOGIN</h2>
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    onChange={handleInput}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    onChange={handleInput}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
                            >
                                LOGIN
                            </button>
                        </form>
                    </div>
                </div>

            </div>
            <div className='mt-5'>
                <p className='text-center'>Haven't you register <span className='text-blue-500'>Register</span></p>
            </div>
        </>

    )
}

export default LoginInstitution
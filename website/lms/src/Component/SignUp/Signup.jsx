import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import GoogleLogin from '../GooglrLogin/GoogleLogin'

const Signup = () => {
    const navigate = useNavigate()
    let [inputs, setInputs] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        role: ""
    })
    let [message, setMessage] = useState("")
    const payload = {
        firstname: inputs.firstname,
        lastname: inputs.lastname,
        email: inputs.email,
        phone: inputs.phone,
        password: inputs.password,
        role: inputs.role
    }


    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let res = await axios.post("http://localhost:8080/sign_up", payload)
            console.log(res);
            if (res.data.success) {
                setMessage(res.data.message)
                await new Promise((back) => setTimeout(back, 3000))
                navigate("/login")
            }

        } catch (error) {

        }
    }
    console.log(inputs);



    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
            <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className='flex mx-auto gap-x-4'>
                        <div className='w-[95%]'>
                            <input
                                type="text"
                                name="firstname"
                                placeholder="FirstName"
                                onChange={handleChange}
                                className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className='w-[95%]'>
                            <input
                                type="text"
                                name="lastname"
                                placeholder="Full Name"
                                onChange={handleChange}
                                className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>


                    <input
                        type="email"
                        name="email"
                        placeholder="Email"

                        onChange={handleChange}
                        className="w-full px-4 py-2 border  focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"

                        onChange={handleChange}
                        className="w-full px-4 py-2 border  focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"

                        onChange={handleChange}
                        className="w-full px-4 py-2 border  focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <select
                        onChange={handleChange}
                        name="role"
                        className="w-full border border-black-300 px-4 py-2  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >     <option value="">Select</option>
                        <option value="student">I want to register as a student</option>
                        <option value="instructor">I want to register as a Instructor</option>

                    </select>
                    {message && <p className='text-center text-green-500'>{message}</p>}

                    <button
                        type="submit"
                        className="w-full mt-5 bg-blue-500 text-white py-2  hover:bg-blue-600 transition"
                    >
                        Sign Up
                    </button>
                    
                </form>
                {/* <div>
                        <GoogleLogin/>
                    </div> */}
            </div>

            <div className='mt-3'>
                <p className='text-center'>  If you already registerd, <span className='text-blue-600'>Login</span></p>
            </div>
        </div>
    )
}

export default Signup
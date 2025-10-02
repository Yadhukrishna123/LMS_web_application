import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { AllCourseDetail } from '../AllCourseContext/Context'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    // const location = useLocation();
    const { getUserData } = useContext(AllCourseDetail)
    const dispatch = useDispatch()
    let [message, setMessage] = useState("")
    const navigate = useNavigate()
    let [inputs, setInputs] = useState({
        emailOrPhone: "",
        password: "",

    })


    // useEffect(() => {
    //     const params = new URLSearchParams(location.search)
    //     const token = params.get("token")
    //     const encodedUser = params.get("user")

    //     if (token && encodedUser) {
    //         try {
    //             const decodeData = atob(encodedUser)
    //             const userData = JSON.parse(decodeData)

    //             console.log(decodeData);
    //             console.log(userData);

    //             localStorage.setItem("token", token)
    //             localStorage.setItem("user", JSON.stringify(userData))


    //             // navigate('/login', { replace: true });

    //         } catch (error) {
    //             console.error('Error decoding user data or parsing JSON:', error);

    //         }
    //     }
    // }, [location, navigate])




    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let res = await axios.post("http://localhost:8080/api/v1/login", {
                email: inputs.emailOrPhone,
                password: inputs.password
            })
            console.log(res);
            if (res.data.success) {
                if (res.data.isAuthentication) {
                    getUserData(res.data.user, res.data.isAuthentication)
                    setMessage(res.data.message)
                    await new Promise((back) => setTimeout(back, 2000))
                    navigate("/")
                }

            }

        } catch (error) {

        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
            <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Sign in</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="emailOrPhone"
                        placeholder="Email or phone"

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

                    {message && <p className='text-center text-green-500'>{message}</p>}

                    <button
                        type="submit"
                        className="w-full mt-5 bg-blue-500 text-white py-2  hover:bg-blue-600 transition"
                    >
                        Sign in

                    </button>
                </form>
            </div>
            <div className='mt-3'>
                <p className='text-center'>  If you don’t have an account, <span className='text-blue-600'>Register</span></p>
            </div>
        </div>
    )
}

export default Login
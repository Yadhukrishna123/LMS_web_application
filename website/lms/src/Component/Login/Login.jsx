import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { AllCourseDetail } from '../AllCourseContext/Context'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    // const location = useLocation();
    const [showPassword, setShowPassword] = useState(false)
    const { getUserData } = useContext(AllCourseDetail)
    let [message, setMessage] = useState("")
    const navigate = useNavigate()
    let [inputs, setInputs] = useState({
        emailOrPhone: "",
        password: "",

    })



    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
                email: inputs.emailOrPhone,
                password: inputs.password
            })
            console.log(res);
            if (res.data.success) {
                if (res.data.isAuthentication) {
                    getUserData(res.data.user, res.data.isAuthentication)
                    localStorage.setItem("userId", res.data.user._id);
                    toast.success(res.data.message)
                    setMessage(res.data.message)
                    await new Promise((back) => setTimeout(back, 2000))
                    navigate("/")
                }

            }

        } catch (error) {

        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
            <ToastContainer />
            <div className="w-full max-w-6xl flex bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Left Side - Hero Section */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-12 flex-col justify-between relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -ml-48 -mb-48"></div>
                    
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
                            </svg>
                        </div>
                        <h1 className="text-5xl font-bold text-white mb-4 leading-tight">Welcome Back to Your Learning Hub</h1>
                        <p className="text-blue-100 text-lg">Continue your educational journey with us</p>
                    </div>
                    
                    <div className="relative z-10 space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg mb-1">Track Your Progress</h3>
                                <p className="text-blue-100 text-sm">Resume where you left off</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg mb-1">Access Your Courses</h3>
                                <p className="text-blue-100 text-sm">All your enrolled courses in one place</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg mb-1">Join Community</h3>
                                <p className="text-blue-100 text-sm">Connect with fellow learners</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form Section */}
                <div className="w-full lg:w-1/2 p-8 md:p-12">
                    <div className="max-w-md mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                            <p className="text-gray-600">Sign in to continue your learning</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-5">
                                {/* Email/Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email or Phone</label>
                                    <div className="relative">
                                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <input
                                            type="text"
                                            name="emailOrPhone"
                                            placeholder="Enter your email or phone"
                                            value={inputs.emailOrPhone}
                                            onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                    <div className="relative">
                                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Enter your password"
                                            value={inputs.password}
                                            onChange={handleChange}
                                            className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Forget Password */}
                                <div className="text-right">
                                    <Link to="/enter_email" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition">
                                        Forgot password?
                                    </Link>
                                </div>

                                {/* Success Message */}
                                {message && (
                                    <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
                                        <p className="font-medium">{message}</p>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl transform hover:scale-[1.01] active:scale-[0.99]"
                                >
                                    Sign In
                                </button>
                            </div>

                            {/* Footer */}
                            <div className="mt-6 text-center">
                                <p className="text-gray-600 text-sm">
                                    Don't have an account?{' '}
                                    <Link 
                                        to="/sign_up"
                                        className="text-blue-600 hover:text-blue-700 font-semibold transition"
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </div>

                            <div className="mt-6 text-center">
                                <p className="text-gray-500 text-xs">
                                    By signing in, you agree to our{' '}
                                    <a href="#" className="text-blue-600 hover:underline">Terms</a>
                                    {' '}and{' '}
                                    <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
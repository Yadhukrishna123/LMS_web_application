import React from 'react'
import "./Home1.css"

const Home1 = () => {
    return (
        <div className="home-hero-bg min-h-screen flex items-center justify-center">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-20 px-8">
                {/* Left Content */}
                <div className="max-w-xl md:w-1/2">
                    <div className="mb-6">
                        <span className="inline-flex items-center text-green-600 font-semibold text-lg mb-1">
                            <svg width="18" height="18" fill="none" className="mr-2"><circle cx="9" cy="9" r="8" stroke="#22c55e" strokeWidth="2"/><path d="M7 9.5l2 2 4-4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Get 30% off on first enroll
                        </span>
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 mt-4 leading-tight">
                            Advance your engineering skills with us.
                        </h2>
                    </div>
                    <p className="text-lg text-gray-500 mb-8">
                        Build skills with our courses and mentor from world-class companies.
                    </p>
                    {/* Search/Course CTA */}
                    <form className="flex items-center mb-10">
                        <input className="px-6 py-4 rounded-l-full bg-white shadow text-gray-700 text-lg w-full focus:outline-none" type="text" placeholder="search courses..." />
                        <button className="px-5 py-4 bg-indigo-600 text-white rounded-r-full text-lg font-semibold -ml-3 shadow">
                            <svg width="24" height="24" fill="none"><circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                        </button>
                    </form>
                    {/* Features */}
                    <div className="flex gap-8 mb-5">
                        <div className="flex items-center gap-2 text-blue-500 font-medium">
                            <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="9" stroke="#0ea5e9" strokeWidth="2"/><path d="M8.5 11.5l2 2 5-5" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Flexible
                        </div>
                        <div className="flex items-center gap-2 text-blue-500 font-medium">
                            <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="9" stroke="#0ea5e9" strokeWidth="2"/><path d="M8.5 11.5l2 2 5-5" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Learning path
                        </div>
                        <div className="flex items-center gap-2 text-blue-500 font-medium">
                            <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="9" stroke="#0ea5e9" strokeWidth="2"/><path d="M8.5 11.5l2 2 5-5" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Community
                        </div>
                    </div>
                </div>
                {/* Right Side Illustration */}
                <div className="md:w-1/2 flex items-center justify-center relative">
                    <img src="https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/positive-caucasian-girl-with-charming-smile-wears-GKMGX34@025x-1.png"
                        alt="Student illustration"
                        className="object-cover h-[430px] w-auto"
                    />
                    {/* Overlay Info Cards */}
                    <div className="absolute left-8 top-10 bg-white shadow-lg rounded-xl px-5 py-3 flex items-center gap-3">
                        <span className="inline-block bg-indigo-100 rounded-full px-2 py-1 text-indigo-600 text-sm font-bold">K</span>
                        <span className="font-medium text-gray-700 text-base">50+ Available courses</span>
                    </div>
                    <div className="absolute right-6 top-6 bg-white shadow-lg rounded-xl px-7 py-6">
                        <span className="block text-sm text-gray-500 mb-2">No of students</span>
                        {/* Example bars */}
                        <div className="flex space-x-1 items-end">
                            <div className="w-2 h-3 bg-[#38bdf8] rounded-sm"/>
                            <div className="w-2 h-6 bg-[#4ade80] rounded-sm"/>
                            <div className="w-2 h-8 bg-[#f59e42] rounded-sm"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home1

import React from 'react'
import "./Home1.css"

const Home1 = () => {
    return (
        <div className="bg-[#f6f9ff] min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-5 py-10 sm:py-16 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-7 relative">
                
                {/* Left section */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center text-center md:text-left">
                    <span className="flex items-center text-green-600 font-semibold mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg">
                        <svg width="20" height="20" fill="none" className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5">
                            <circle cx="10" cy="10" r="9" stroke="#22c55e" strokeWidth="2" />
                            <path d="M8 10.5l2 2 5-5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        Get 30% off on first enroll
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
                        Advance your<br />engineering skills<br />with us.
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-500 mb-6 sm:mb-8 max-w-md md:max-w-none">
                        Build skills with our courses and mentor from world-class companies.
                    </p>
                    {/* Search Bar */}
                    <div className="w-full max-w-sm sm:max-w-md md:max-w-xl mb-5 sm:mb-7 rounded-full flex overflow-hidden shadow-lg sm:shadow-xl bg-white">
                        <input
                            type="text"
                            placeholder="search courses..."
                            className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 w-full text-sm sm:text-base md:text-lg text-gray-700 focus:outline-none bg-white"
                        />
                        <button className="bg-[#5f4fff] px-4 sm:px-5 md:px-6 py-3 sm:py-4 text-white font-bold text-sm sm:text-base md:text-lg flex items-center">
                            <svg width="24" height="24" fill="none" className="w-5 h-5 sm:w-6 sm:h-6">
                                <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2"/>
                                <path d="M21 21l-4.35-4.35" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>
                   
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-2 text-[#2563eb] font-bold sm:font-semibold text-base sm:text-base md:text-lg w-full sm:w-auto">
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                            <svg width="20" height="20" fill="none" className="w-5 h-5 sm:w-5 sm:h-5"><circle cx="10" cy="10" r="9" stroke="#0ea5e9" strokeWidth="2" /><path d="M8.5 11.5l2 2 5-5" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" /></svg>
                            Flexible
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                            <svg width="20" height="20" fill="none" className="w-5 h-5 sm:w-5 sm:h-5"><circle cx="10" cy="10" r="9" stroke="#0ea5e9" strokeWidth="2" /><path d="M8.5 11.5l2 2 5-5" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" /></svg>
                            Learning path
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                            <svg width="20" height="20" fill="none" className="w-5 h-5 sm:w-5 sm:h-5"><circle cx="10" cy="10" r="9" stroke="#0ea5e9" strokeWidth="2" /><path d="M8.5 11.5l2 2 5-5" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" /></svg>
                            Community
                        </div>
                    </div>
                </div>

                {/* Right section */}
                <div className="w-full md:w-1/2 flex items-center justify-center relative mt-8 md:mt-0">
                    <img
                        src="https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/positive-caucasian-girl-with-charming-smile-wears-GKMGX34@025x-1.png"
                        alt="Hero"
                        className="object-cover h-[250px] sm:h-[330px] md:h-[380px] lg:h-[430px] w-auto drop-shadow-xl"
                    />
                    {/* Info cards */}
                    <div className="absolute -left-2 sm:left-0 md:left-2 bottom-16 sm:bottom-20 md:bottom-28 bg-white shadow-lg rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-5 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 scale-75 sm:scale-90 md:scale-100">
                        <span className="inline-block bg-indigo-100 rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 text-indigo-600 text-xs sm:text-sm font-bold">K</span>
                        <span className="font-medium text-gray-700 text-xs sm:text-sm md:text-base whitespace-nowrap">50+ Available courses</span>
                    </div>
                    <div className="absolute -right-2 sm:right-2 md:right-7 top-6 sm:top-8 md:top-12 bg-white shadow-lg rounded-lg sm:rounded-xl px-3 sm:px-5 md:px-7 py-2 sm:py-4 md:py-6 scale-75 sm:scale-90 md:scale-100">
                        <span className="block text-[10px] sm:text-xs md:text-sm text-gray-500 mb-1 sm:mb-2">No of students</span>
                        <div className="flex space-x-1.5 sm:space-x-2 items-end">
                            <div className="w-1.5 sm:w-2 h-2 sm:h-3 bg-[#38bdf8] rounded-sm"/>
                            <div className="w-1.5 sm:w-2 h-4 sm:h-6 md:h-7 bg-[#4ade80] rounded-sm"/>
                            <div className="w-1.5 sm:w-2 h-6 sm:h-8 md:h-10 bg-[#f59e42] rounded-sm"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home1
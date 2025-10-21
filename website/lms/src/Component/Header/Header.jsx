import React, { useContext } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import Logout from '../LogoutModal/Logout';
import { AllCourseDetail } from '../AllCourseContext/Context';

const Header = () => {
    const { authentication } = useContext(AllCourseDetail)
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [isLogout, setLogout] = useState(false)

    const handlePage = () => {
        setIsDropdownOpen((prev) => !prev)
    }
    
    return (
        <header className="bg-gradient-to-r from-white to-gray-50 shadow-sm border-b border-gray-100">
            {isLogout && <Logout setLogout={setLogout}/>}

            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
               
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img className='w-32 h-auto' src="https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/logo_Asset-7.png" alt="Logo" />
                </div>

                {/* Navigation Links (hidden on mobile) */}
                <nav className="hidden lg:flex items-center space-x-1">
                    <Link to="/" className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 rounded-lg hover:bg-indigo-50">
                        Home
                    </Link>
                    <Link to="/about" className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 rounded-lg hover:bg-indigo-50">
                        About
                    </Link>
                    <Link to="/allcourses" className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 rounded-lg hover:bg-indigo-50">
                        Courses
                    </Link>
                    <Link to="/quizzes" className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 rounded-lg hover:bg-indigo-50">
                        Quiz
                    </Link>

                    {/* Dropdown Menu */}
                    <div className="relative" onClick={handlePage}>
                        <button className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 rounded-lg hover:bg-indigo-50 flex items-center space-x-1">
                            <span>Look Up</span>
                            <svg className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 bg-white shadow-xl rounded-xl mt-2 w-48 z-50 border border-gray-100 overflow-hidden">
                                <Link to="/cateogeries" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150">
                                    Categories
                                </Link>
                                <Link to="/mentors" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150">
                                    Mentors
                                </Link>
                                <Link to="/testimonials" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150">
                                    Testimonials
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link to="/contact" className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 rounded-lg hover:bg-indigo-50">
                        Contact
                    </Link>
                </nav>

                {/* Action Buttons */}
                <div className='flex items-center space-x-3'>
                    {/* Profile Dropdown for desktop only when logged in */}
                    {authentication && (
                        <div className="relative hidden lg:block">
                            <button 
                                className="p-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all duration-200"
                                onClick={() => setOpen(!open)}
                            >
                                <CgProfile size={28} />
                            </button>
                            
                            {open && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                                    <ul className="py-2">
                                        <li>
                                            <Link
                                                to="/user_page"
                                                className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                        <li 
                                            onClick={() => setLogout(true)} 
                                            className='block px-4 py-3 text-red-500 hover:bg-red-50 cursor-pointer transition-colors duration-150'
                                        >
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Sign In / Sign Up Buttons - Desktop only when not logged in */}
                    {!authentication && (
                        <div className="hidden lg:flex items-center space-x-3">
                            <Link 
                                to="/login"
                                className="px-6 py-2.5 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition-all duration-200"
                            >
                                Sign In
                            </Link>
                            <Link 
                                to="/sign_up"
                                className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="lg:hidden text-gray-700 hover:text-indigo-600 focus:outline-none p-2"
                    >
                        {isOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100">
                    <nav className="flex flex-col p-4 space-y-1">
                        <Link to="/" className="px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">
                            Home
                        </Link>
                        <Link to="/about" className="px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">
                            About
                        </Link>
                        <Link to="/allcourses" className="px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">
                            Courses
                        </Link>
                        <Link to="/quizzes" className="px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">
                            Quiz
                        </Link>

                        <div>
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className='flex justify-between items-center w-full px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors'
                            >
                                <span>Look Up</span>
                                <svg className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isDropdownOpen && (
                                <div className="flex flex-col pl-4 mt-1 space-y-1">
                                    <Link to="/cateogeries" className="px-4 py-2 text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
                                        Categories
                                    </Link>
                                    <Link to="/mentors" className="px-4 py-2 text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
                                        Mentors
                                    </Link>
                                    <Link to="/testimonials" className="px-4 py-2 text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
                                        Testimonials
                                    </Link>
                                </div>
                            )}
                        </div>
                        <Link to="/contact" className="px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">
                            Contact
                        </Link>

                        {/* Profile and Auth Buttons for mobile */}
                        {authentication ? (
                            <>
                                <Link to="/user_page" className="mt-2 w-full bg-indigo-50 text-indigo-600 px-4 py-3 rounded-lg hover:bg-indigo-100 transition-colors font-semibold text-center">
                                    Profile
                                </Link>
                                <button 
                                    onClick={() => setLogout(true)}
                                    className="w-full bg-red-50 text-red-600 px-4 py-3 rounded-lg hover:bg-red-100 transition-colors font-semibold"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="mt-2 w-full bg-indigo-50 text-indigo-600 px-4 py-3 rounded-lg hover:bg-indigo-100 transition-colors font-semibold text-center">
                                    Sign In
                                </Link>
                                <Link to="/sign_up" className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-center shadow-md">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Header

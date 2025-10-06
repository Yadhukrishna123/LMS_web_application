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
        <header className="bg-white shadow-md">
            {isLogout && <Logout setLogout={setLogout}/>}

            <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
               
                <div className="text-2xl font-bold text-blue-600">
                    <img className='sm:w-24 ' src="https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/logo_Asset-7.png" alt="" />
                </div>

                {/* Navigation Links (hidden on mobile) */}
                <nav className="hidden md:flex space-x-6">
                    <Link to="/" className="ml-3 text-gray-700 hover:text-blue-600">Home</Link>
                    <Link to="/about" className="ml-3 text-gray-700 hover:text-blue-600">About</Link>
                    <Link to="/allcourses" className="ml-3 text-gray-700 hover:text-blue-600">Courses</Link>
                    <Link to="/quizzes" className="ml-3 text-gray-700 hover:text-blue-600">Quiz</Link>

                    {/* <a href="#" className=" ml-3 text-gray-700 hover:text-blue-600">Page</a> */}
                    <div
                        className="relative"
                        onClick={handlePage}

                    >
                        <button className="text-gray-700 hover:text-blue-600 flex items-center">
                            Look Up ▼
                        </button>

                    
                        {isDropdownOpen && (
                            <div className="absolute flex flex-col top-full left-0 bg-white shadow-lg rounded-md mt-2 w-40 z-50">
                                <Link to="/cateogeries" className="ml-3 text-gray-700 hover:text-blue-600">Cateogeries</Link>
                                <Link to="/mentors" className="ml-3 text-gray-700 hover:text-blue-600">Mentors</Link>
                                <Link to="/testimonials" className="ml-3 text-gray-700 hover:text-blue-600">Testimonials</Link>
                            </div>
                        )}
                    </div>


                    <Link to="/contact" className="ml-3 text-gray-700 hover:text-blue-600">Contact</Link>
                </nav>


                <div className='flex '>

                    <button className="hidden md:block ml-3  text-dark px-4 py-2 "
                        onClick={() => setOpen(!open)}
                    >
                        <CgProfile size={30} />
                        {open && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-50">
                                <ul className="py-2">
                                    {authentication ? (
                                        <>
                                            <li>
                                                <Link
                                                    to="/user_profile"
                                                    className="block px-4 py-2 hover:bg-gray-100"
                                                >
                                                    Profile
                                                </Link>
                                            </li>
                                            <li onClick={() => setLogout(true)} className='text-red-500'>
                                                Logout
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <Link
                                                    to="/login"
                                                    className="block px-4 py-2 hover:bg-gray-100"
                                                >
                                                    Login
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/sign_up"
                                                    className="block px-4 py-2 hover:bg-gray-100"
                                                >
                                                    Register
                                                </Link>
                                            </li>
                                        </>
                                    )}






                                </ul>
                            </div>
                        )}
                    </button>






                </div>

                {/* Mobile Menu Button */}

                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 focus:outline-none">
                    {isOpen ? "✕" : "☰"}
                </button>

            </div>
            {isOpen && (
                <div className="md:hidden bg-gray-50 border-t">
                    <nav className="flex flex-col space-y-3 p-4">
                        <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
                        <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
                        <a href="#" className="text-gray-700 hover:text-blue-600">Courses</a>

                        <div>
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className='flex justify-between w-full text-gray-700 hover:text-blue-600'
                            >
                                page {isDropdownOpen ? "▲" : "▼"}
                            </button>

                            {isDropdownOpen && (
                                <div className="flex flex-col pl-4 mt-2 space-y-1">
                                    <a href="#" className="text-gray-700 hover:text-blue-600">Page 1</a>
                                    <a href="#" className="text-gray-700 hover:text-blue-600">Page 2</a>
                                    <a href="#" className="text-gray-700 hover:text-blue-600">Page 3</a>
                                </div>
                            )}
                        </div>


                        <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
                        <button className="bg-blue-600 text-white px-4 py-2  hover:bg-blue-700">
                            Login
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            Sign up
                        </button>
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Header
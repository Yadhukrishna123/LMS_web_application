import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { FaBell } from "react-icons/fa";
import Logout from '../LogoutModal/Logout';
import { AllCourseDetail } from '../AllCourseContext/Context';

const Header = () => {
  const { user } = useContext(AllCourseDetail);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [isLogout, setLogout] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  
  // 👇 ONLY ADDITION - No extra page needed!
  const getProfileRoute = () => {
    return user?.role === 'instructor' ? '/instructor_page' : '/user_page';
  };

  return (
    <header className="bg-white shadow-md relative">
      {isLogout && <Logout setLogout={setLogout} />}
      
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">
          <img className='sm:w-24' src="https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/logo_Asset-7.png" alt="Logo" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          <Link to="/" className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50">Home</Link>
          <Link to="/about" className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50">About</Link>
          <Link to="/allcourses" className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50">Courses</Link>
          <Link to="/quizzes" className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50">Quiz</Link>
          
          <div className="relative" onClick={toggleDropdown}>
            <button className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 flex items-center space-x-1">
              <span>Look Up</span>
              <svg className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 bg-white shadow-xl rounded-xl mt-2 w-48 z-50 border border-gray-100 overflow-hidden">
                <Link to="/cateogeries" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150">Categories</Link>
                <Link to="/mentors" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150">Mentors</Link>
                <Link to="/testimonials" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150">Testimonials</Link>
              </div>
            )}
          </div>
          
          <Link to="/contact" className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50">Contact</Link>
        </nav>

        {/* Desktop Profile */}
        <div className='hidden lg:flex items-center space-x-8'>
          {user ? (
            <>
              <Link to="/notification" className="relative">
                <FaBell size={24} className="text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">1</span>
              </Link>
              
              <button className="text-gray-700 relative" onClick={() => setOpenProfile(!openProfile)}>
                <CgProfile size={30} />
                {openProfile && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-50">
                    <ul className="py-2">
                      <li>
                        <Link to={getProfileRoute()} className="block px-4 py-2 hover:bg-gray-100">
                          Profile
                        </Link>
                      </li>
                      <li onClick={() => setLogout(true)} className='text-red-500 cursor-pointer px-4 py-2 hover:bg-red-50'>
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-6 py-2.5 text-indigo-600 font-semibold rounded-full hover:bg-indigo-500 hover:text-white transition-colors shadow-md">
                Sign In
              </Link>
              <Link to="/sign_up" className="px-6 py-2.5 text-indigo-600 font-semibold rounded-full hover:bg-indigo-500 hover:text-white transition-colors shadow-md">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-gray-700 focus:outline-none ml-2 text-2xl">
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <nav className="flex flex-col p-4 space-y-1">
            <Link to="/" className="px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">Home</Link>
            <Link to="/about" className="px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">About</Link>
            <Link to="/allcourses" className="px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">Courses</Link>
            <Link to="/quizzes" className="px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">Quiz</Link>
            
            <div>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='flex justify-between items-center w-full px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors'>
                <span>Look Up</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="flex flex-col pl-4 mt-1 space-y-1">
                  <Link to="/cateogeries" className="px-4 py-2 text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">Categories</Link>
                  <Link to="/mentors" className="px-4 py-2 text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">Mentors</Link>
                  <Link to="/testimonials" className="px-4 py-2 text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">Testimonials</Link>
                </div>
              )}
            </div>
            
            <Link to="/contact" className="px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">Contact</Link>

            {user ? (
              <>
                <Link to={getProfileRoute()} className="mt-2 w-full bg-indigo-50 text-indigo-600 px-4 py-3 rounded-lg hover:bg-indigo-100 font-semibold text-center">
                  Profile
                </Link>
                <button onClick={() => setLogout(true)} className="w-full bg-red-50 text-red-600 px-4 py-3 rounded-lg hover:bg-red-100 font-semibold">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mt-2 w-full bg-indigo-50 text-indigo-600 px-4 py-3 rounded-lg hover:bg-indigo-100 font-semibold text-center">Sign In</Link>
                <Link to="/sign_up" className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 font-semibold shadow-md">Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
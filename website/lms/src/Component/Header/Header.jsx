import React, { use, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { FaBell } from "react-icons/fa";
import Logout from '../LogoutModal/Logout';
import { AllCourseDetail } from '../AllCourseContext/Context';
import axios from 'axios';

const Header = () => {
  const { user } = useContext(AllCourseDetail);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [isLogout, setLogout] = useState(false);
  const token = localStorage.getItem('token');

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  
  const getProfileRoute = () => {
    return user?.role === 'instructor' ? '/instructor_page' : '/user_page';
  };
    
  
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const res = await axios.get('http://localhost:8080/api/v1/usernotifications', {
            withCredentials: true,
          });
          

          if (res.data.success) {
            setNotifications(res.data.notifications);
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchNotifications();
    }, [token]);

  // MAIN NAVIGATION
  const getMainNavigation = () => {
    const commonNav = [
      { name: 'Home', path: '/', show: true },
      { name: 'About', path: '/about', show: true },
    ];

    if (!user) {
      // Not logged in - show public pages
      return [
        ...commonNav,
        { name: 'Courses', path: '/allcourses', show: true },
        { name: 'Quiz', path: '/quizzes', show: true },
        { name: 'Contact', path: '/contact', show: true },
      ];
    }

    if (user.role === 'instructor') {
      // Instructor navigation
      return [
        ...commonNav,
        { name: 'My Courses', path: '/my_courses', show: true },
        { name: 'Students', path: '/enrolled_students', show: true },
        { name: 'Analytics', path: '/course_analytics', show: true },
        { name: 'Contact', path: '/contact', show: true },
      ];
    } else {
      // Student navigation
      return [
        ...commonNav,
        { name: 'Browse Courses', path: '/allcourses', show: true },
        { name: 'My Learning', path: '/user_page', show: true },
        { name: 'Quiz', path: '/quizzes', show: true },
        { name: 'Contact', path: '/contact', show: true },
      ];
    }
  };

  //  ROLE-BASED DROPDOWN ITEMS
  const getDropdownItems = () => {
    if (!user) {
      // Not logged in
      return [
        { name: 'Categories', path: '/cateogeries', },
        { name: 'Mentors', path: '/mentors',  },
        { name: 'Testimonials', path: '/testimonials', },
      ];
    }

    if (user.role === 'instructor') {
      // Instructor dropdown
      return [
        { name: 'Create Course', path: '/create_course',  },
        { name: 'Quiz Manager', path: '/instructor_quiz_manager',  },
        { name: 'Help & Support', path: '/help',  },
      ];
    } else {
      // Student dropdown
      return [
        { name: 'Categories', path: '/cateogeries', },
        { name: 'Mentors', path: '/mentors',  },
        { name: 'Testimonials', path: '/testimonials',  },
        { name: 'Help & Support', path: '/help',  },
      ];
    }
  };

  // PROFILE DROPDOWN ITEMS
  const getProfileMenuItems = () => {
    if (!user) return [];

    if (user.role === 'instructor') {
      return [
        { name: 'Dashboard', path: '/instructor_page',   },
        { name: 'My Courses', path: '/instructor/courses',  },
        { name: 'Earnings', path: '/instructor/earnings',   },
        { name: 'Settings', path: '/settings',   },
      ];
    } else {
      return [
        { name: 'My Profile', path: '/user_page',   },
        { name: 'My Courses', path: '/user_page',   },
        { name: 'Certificates', path: '/certificates',   },
        { name: 'Settings', path: '/settings',   },
      ];
    }
  };

  const mainNavigation = getMainNavigation();
  const dropdownItems = getDropdownItems();
  const profileMenuItems = getProfileMenuItems();

  return (
    <header className="bg-white shadow-md relative">
      {isLogout && <Logout setLogout={setLogout} />}
      
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>
          <img 
            className='sm:w-24' 
            src="https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/logo_Asset-7.png" 
            alt="Logo" 
          />
        </div>

        {/* DESKTOP NAVIGATION  */}
        <nav className="hidden lg:flex items-center space-x-1">
          {mainNavigation.map((item, index) => (
            item.show && (
              <Link 
                key={index}
                to={item.path} 
                className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50"
              >
                {item.name}
              </Link>
            )
          ))}
          
          {/* Dropdown Menu */}
          <div className="relative">
            <button 
              onClick={toggleDropdown}
              className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 flex items-center space-x-1"
            >
              <span>{user?.role === 'instructor' ? 'Tools' : 'Explore'}</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 bg-white shadow-xl rounded-xl mt-2 w-52 z-50 border border-gray-100 overflow-hidden">
                {dropdownItems.map((item, index) => (
                  <Link 
                    key={index}
                    to={item.path} 
                    className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/*  DESKTOP PROFILE SECTION  */}
        <div className='hidden lg:flex items-center space-x-6'>
          {user ? (
            <>
              {/* Notification Bell */}
              <Link to="/notification" className="relative hover:opacity-80 transition">
                <FaBell size={24} className="text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                 {unreadCount}
                </span>
              </Link>

              {/* Instructor: Create Course Button */}
              {user.role === 'instructor' && (
                <Link 
                  to="create_course"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition"
                >
                  + Create Course
                </Link>
              )}
              
              {/* Profile Dropdown */}
              <div className="relative">
                <button 
                  className="text-gray-700 relative flex items-center space-x-2" 
                  onClick={() => setOpenProfile(!openProfile)}
                >
                  <CgProfile size={30} />
                  {user.name && (
                    <span className="text-sm font-medium hidden xl:block">
                      {user.name}
                    </span>
                  )}
                </button>
                
                {openProfile && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b bg-gray-50">
                      <p className="text-sm font-semibold text-gray-900">
                        {user.name || 'User'}
                      </p>
                      <p className="text-xs text-indigo-600 capitalize font-medium mt-1">
                        {user.role === 'instructor' ? ' Instructor' : ' Student'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                    </div>
                    
                    {/* Menu Items */}
                    <ul className="py-2">
                      {profileMenuItems.map((item, index) => (
                        <li key={index}>
                          <Link 
                            to={item.path} 
                            className="flex items-center space-x-2 px-4 py-2.5 hover:bg-gray-100 text-gray-700"
                            onClick={() => setOpenProfile(false)}
                          >
                            <span>{item.icon}</span>
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                      
                      {/* Logout */}
                      <li className="border-t mt-2 pt-2">
                        <button 
                          onClick={() => {
                            setLogout(true);
                            setOpenProfile(false);
                          }} 
                          className='flex items-center space-x-2 w-full text-left text-red-500 font-medium cursor-pointer px-4 py-2.5 hover:bg-red-50'
                        >
                          <span>Logout</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-6 py-2.5 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition-colors border border-indigo-600"
              >
                Sign In
              </Link>
              <Link 
                to="/sign_up" 
                className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors shadow-md"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="lg:hidden text-gray-700 focus:outline-none ml-2 text-2xl"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/*  MOBILE MENU  */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <nav className="flex flex-col p-4 space-y-1">
            {/* User Info (if logged in) */}
            {user && (
              <div className="px-4 py-3 mb-2 bg-indigo-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-indigo-600 capitalize">
                  {user.role === 'instructor' ? ' Instructor' : ' Student'}
                </p>
              </div>
            )}

            {/* Main Navigation */}
            {mainNavigation.map((item, index) => (
              item.show && (
                <Link 
                  key={index}
                  to={item.path} 
                  className="px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
            
            {/* Mobile Dropdown */}
            <div>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className='flex justify-between items-center w-full px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors'
              >
                <span>{user?.role === 'instructor' ? 'Tools' : 'Explore'}</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="flex flex-col pl-4 mt-1 space-y-1">
                  {dropdownItems.map((item, index) => (
                    <Link 
                      key={index}
                      to={item.path} 
                      className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-indigo-50"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* User Actions */}
            {user ? (
              <>
                {user.role === 'instructor' && (
                  <Link 
                    to="/instructor/create-course"
                    className="mt-2 w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 font-semibold text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    + Create Course
                  </Link>
                )}
                
                <Link 
                  to={getProfileRoute()} 
                  className="w-full bg-indigo-50 text-indigo-600 px-4 py-3 rounded-lg hover:bg-indigo-100 font-semibold text-center"
                  onClick={() => setIsOpen(false)}
                >
                  {user.role === 'instructor' ? ' Dashboard' : ' My Profile'}
                </Link>
                
                <button 
                  onClick={() => {
                    setLogout(true);
                    setIsOpen(false);
                  }} 
                  className="w-full bg-red-50 text-red-600 px-4 py-3 rounded-lg hover:bg-red-100 font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="mt-2 w-full bg-indigo-50 text-indigo-600 px-4 py-3 rounded-lg hover:bg-indigo-100 font-semibold text-center border border-indigo-600"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/sign_up" 
                  className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 font-semibold shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
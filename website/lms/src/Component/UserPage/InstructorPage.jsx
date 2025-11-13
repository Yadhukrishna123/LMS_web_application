import React, { useEffect, useState } from 'react';
import { 
  FaBook, 
  FaUsers, 
  FaDollarSign, 
  FaStar,
  FaChartLine,
  FaPlus,
  FaEdit,
  FaEye,
  FaClock,
  FaGraduationCap,
  FaBell,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaGlobe
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const InstructorPage = () => {
  const [instructorData, setInstructorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalEarnings: 0,
    averageRating: 0
  });

  useEffect(() => {
    fetchInstructorData();
  }, []);

  const fetchInstructorData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
        withCredentials: true
      });
      
      if (res.data.success) {
        setInstructorData(res.data.user);
        console.log('Instructor Data:', res.data.user); // Debug
        // TODO: Fetch instructor stats from your backend
        // fetchInstructorStats(res.data.user._id);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching instructor data:', error);
      setLoading(false);
    }
  };

  // Sample data - Replace with actual API calls
  const recentCourses = [
    { id: 1, title: 'React Masterclass 2024', students: 245, rating: 4.8, status: 'Published' },
    { id: 2, title: 'Node.js Backend Development', students: 189, rating: 4.6, status: 'Published' },
    { id: 3, title: 'Full Stack Web Development', students: 312, rating: 4.9, status: 'Draft' },
  ];

  const recentStudents = [
    { id: 1, name: 'John Doe', course: 'React Masterclass', enrolledDate: '2024-01-10' },
    { id: 2, name: 'Jane Smith', course: 'Node.js Backend', enrolledDate: '2024-01-09' },
    { id: 3, name: 'Mike Johnson', course: 'Full Stack', enrolledDate: '2024-01-08' },
  ];

  const upcomingSchedule = [
    { id: 1, title: 'Live Session: React Hooks', time: '10:00 AM', date: 'Today' },
    { id: 2, title: 'Q&A Session', time: '2:00 PM', date: 'Tomorrow' },
    { id: 3, title: 'Course Review Meeting', time: '4:00 PM', date: 'Jan 15' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!instructorData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-gray-600">Failed to load instructor data</p>
          <button 
            onClick={fetchInstructorData}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header with Real Data */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {instructorData.firstname} {instructorData.lastname}! 👋
              </h1>
              <p className="text-blue-100 text-lg mb-4">
                {instructorData.expertise ? `Expert in ${instructorData.expertise}` : 'Ready to inspire minds today?'}
              </p>
              
              {/* Instructor Contact Info */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-2 rounded-lg">
                  <FaEnvelope className="text-sm" />
                  <span className="text-sm">{instructorData.email}</span>
                </div>
                {instructorData.phone && (
                  <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-2 rounded-lg">
                    <FaPhone className="text-sm" />
                    <span className="text-sm">{instructorData.phone}</span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              {(instructorData.linkedin || instructorData.github || instructorData.website) && (
                <div className="flex gap-3 mt-4">
                  {instructorData.linkedin && (
                    <a
                      href={instructorData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition"
                    >
                      <FaLinkedin className="text-xl" />
                    </a>
                  )}
                  {instructorData.github && (
                    <a
                      href={instructorData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition"
                    >
                      <FaGithub className="text-xl" />
                    </a>
                  )}
                  {instructorData.website && (
                    <a
                      href={instructorData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition"
                    >
                      <FaGlobe className="text-xl" />
                    </a>
                  )}
                </div>
              )}
            </div>
            
            <div className="hidden md:block">
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-4">
                {instructorData.image ? (
                  <img 
                    src={instructorData.image} 
                    alt={instructorData.firstname}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                    <span className="text-5xl font-bold">
                      {instructorData.firstname?.[0]}{instructorData.lastname?.[0]}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Instructor Bio */}
          {instructorData.bio && (
            <div className="mt-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-4">
              <h3 className="font-semibold mb-2">About Me</h3>
              <p className="text-blue-100 text-sm leading-relaxed">{instructorData.bio}</p>
            </div>
          )}

          {/* Qualifications */}
          {(instructorData.qualification || instructorData.experience) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {instructorData.qualification && (
                <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-4">
                  <h4 className="font-semibold mb-1 text-sm">🎓 Qualification</h4>
                  <p className="text-blue-100 text-sm">{instructorData.qualification}</p>
                </div>
              )}
              {instructorData.experience && (
                <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-4">
                  <h4 className="font-semibold mb-1 text-sm">💼 Experience</h4>
                  <p className="text-blue-100 text-sm">{instructorData.experience} years</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Courses */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Courses</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.totalCourses || 12}</h3>
                <p className="text-green-600 text-sm mt-2">↑ 2 this month</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-xl">
                <FaBook className="text-blue-600 text-3xl" />
              </div>
            </div>
          </div>

          {/* Total Students */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Students</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.totalStudents || 1245}</h3>
                <p className="text-green-600 text-sm mt-2">↑ 89 this month</p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl">
                <FaUsers className="text-green-600 text-3xl" />
              </div>
            </div>
          </div>

          {/* Total Earnings */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Earnings</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">${stats.totalEarnings || '12,480'}</h3>
                <p className="text-green-600 text-sm mt-2">↑ $2,340 this month</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-xl">
                <FaDollarSign className="text-yellow-600 text-3xl" />
              </div>
            </div>
          </div>

          {/* Average Rating */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Average Rating</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.averageRating || 4.8}</h3>
                <div className="flex items-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className="text-yellow-500 text-sm" />
                  ))}
                </div>
              </div>
              <div className="bg-purple-100 p-4 rounded-xl">
                <FaStar className="text-purple-600 text-3xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/instructor/create-course"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition shadow-md"
            >
              <FaPlus className="text-2xl" />
              <span className="font-semibold">Create New Course</span>
            </Link>

            <Link
              to="/instructor/courses"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition shadow-md"
            >
              <FaEdit className="text-2xl" />
              <span className="font-semibold">Manage Courses</span>
            </Link>

            <Link
              to="/instructor/analytics"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition shadow-md"
            >
              <FaChartLine className="text-2xl" />
              <span className="font-semibold">View Analytics</span>
            </Link>

            <Link
              to="/instructor/schedule"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition shadow-md"
            >
              <FaCalendarAlt className="text-2xl" />
              <span className="font-semibold">Schedule Session</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
                <Link
                  to="/instructor/courses"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All →
                </Link>
              </div>

              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <FaBook className="text-white text-2xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <FaUsers className="text-xs" /> {course.students} students
                          </span>
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <FaStar className="text-yellow-500 text-xs" /> {course.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          course.status === 'Published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {course.status}
                      </span>
                      <button className="p-2 hover:bg-gray-200 rounded-lg transition">
                        <FaEye className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Students */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Students</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        Student
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        Course
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        Enrolled
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentStudents.map((student) => (
                      <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                              {student.name.charAt(0)}
                            </div>
                            <span className="font-medium text-gray-900">{student.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{student.course}</td>
                        <td className="py-3 px-4 text-gray-600">{student.enrolledDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Schedule */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Schedule</h2>
                <FaCalendarAlt className="text-blue-600" />
              </div>
              <div className="space-y-4">
                {upcomingSchedule.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-600"
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaClock className="text-xs" />
                      <span>{item.time}</span>
                      <span className="text-gray-400">•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                View Full Schedule
              </button>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                <FaBell className="text-yellow-600" />
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-900 font-medium">New student enrolled</p>
                  <p className="text-xs text-gray-600 mt-1">5 minutes ago</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-900 font-medium">Course review received</p>
                  <p className="text-xs text-gray-600 mt-1">2 hours ago</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-900 font-medium">Payment received</p>
                  <p className="text-xs text-gray-600 mt-1">1 day ago</p>
                </div>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Profile Status</h3>
              <div className="space-y-3">
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Account Status</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      instructorData.verificationStatus === 'approved' 
                        ? 'bg-green-500' 
                        : instructorData.verificationStatus === 'pending'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}>
                      {instructorData.verificationStatus?.toUpperCase()}
                    </span>
                  </div>
                  {instructorData.isApproved && (
                    <p className="text-xs text-blue-100">✓ Verified Instructor</p>
                  )}
                </div>
                <Link 
                  to="/instructor/profile"
                  className="block w-full py-2 bg-white text-purple-600 rounded-lg hover:bg-opacity-90 transition font-medium text-center"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  FaBook, 
  FaUsers, 
  FaStar, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaPlus,
  FaSearch,
  FaFilter,
  FaThLarge,
  FaList
} from 'react-icons/fa';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); 
  
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    sort: 'newest'
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, courses]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/my-courses', {
        withCredentials: true
      });
      console.log('API Response:', res.data);

      if (res.data.success) {
        setCourses(res.data.courses);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...courses];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(course =>
        course.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.description?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(course => course.status === filters.status);
    }

    // Sort
    switch (filters.sort) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'students':
        filtered.sort((a, b) => (b.students_count || 0) - (a.students_count || 0));
        break;
      case 'revenue':
        filtered.sort((a, b) => (b.total_revenue || 0) - (a.total_revenue || 0));
        break;
      default:
        break;
    }

    setFilteredCourses(filtered);
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await axios.delete(
        `http://localhost:8080/api/v1/get_course/${courseId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setCourses(courses.filter(c => c._id !== courseId));
        alert('Course deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert(error.response?.data?.message || 'Failed to delete course');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              My Courses ({filteredCourses.length})
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your course content and track performance
            </p>
          </div>
          <Link
            to="/create_course"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-semibold flex items-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg transition"
          >
            <FaPlus /> Create New Course
          </Link>
        </div>

        {/* Filters & Controls */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

            {/* Sort */}
            <select
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="students">Most Students</option>
              <option value="revenue">Highest Revenue</option>
            </select>

            {/* View Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <FaThLarge className="inline mr-2" /> Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                  viewMode === 'list'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <FaList className="inline mr-2" /> List
              </button>
            </div>
          </div>
        </div>

        {/* Courses Display */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow-md text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {courses.length === 0 ? 'No courses yet' : 'No courses match your filters'}
            </h3>
            <p className="text-gray-600 mb-6">
              {courses.length === 0
                ? 'Create your first course to start teaching!'
                : 'Try adjusting your search or filters'}
            </p>
            {courses.length === 0 && (
              <Link
                to="/create_course"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-semibold"
              >
                Create Your First Course
              </Link>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/*  Use course._id as key (MongoDB uses _id not id) */}
            {filteredCourses.map((course) => (
              <CourseCardGrid
                key={course._id}
                course={course}
                onDelete={handleDeleteCourse}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {/*  Use course._id as key */}
            {filteredCourses.map((course) => (
              <CourseCardList
                key={course._id}
                course={course}
                onDelete={handleDeleteCourse}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Grid View Course Card
const CourseCardGrid = ({ course, onDelete }) => {
  const statusColors = {
    published: 'bg-green-100 text-green-800 border-green-300',
    draft: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    archived: 'bg-gray-100 text-gray-800 border-gray-300',
  };

  //  Better placeholder image handling
  const getCourseThumbnail = () => {
    if (course.image && course.image.length > 0 && course.image[0]) {
      return course.image[0];
    }
    // Use data URL for placeholder to avoid network issues
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225"%3E%3Crect width="400" height="225" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%239ca3af"%3ECourse Thumbnail%3C/text%3E%3C/svg%3E';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={getCourseThumbnail()}
          alt={course.title}
          className="w-full h-48 object-cover bg-gray-200"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225"%3E%3Crect width="400" height="225" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[course.status || 'draft']}`}>
          {(course.status || 'DRAFT').toUpperCase()}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
          {course.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <FaUsers className="text-blue-600" />
              {course.students_count || 0} students
            </span>
            <span className="flex items-center gap-1">
              <FaStar className="text-yellow-500" />
              {course.avg_rating ? parseFloat(course.avg_rating).toFixed(1) : 'No ratings'}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              <FaBook className="inline text-purple-600 mr-1" />
              {course.lessons_count || course.courseModules?.length || 0} lessons
            </span>
            <span className="font-semibold text-green-600">
              ${course.total_revenue || course.price || 0}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 gap-2 mb-2">
          {/*  Use _id instead of id */}
          <Link
            to={`/edit_course/${course._id}`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-semibold text-center transition"
          >
            <FaEdit className="inline mr-1" /> Edit
          </Link>
        </div>

        <Link
          to={`/course_students/${course._id}`}
          className="block w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-semibold text-center mb-2 transition"
        >
          <FaUsers className="inline mr-1" /> View Students
        </Link>

        <button
          onClick={() => onDelete(course._id)}
          className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-semibold transition"
        >
          <FaTrash className="inline mr-1" /> Delete Course
        </button>
      </div>
    </div>
  );
};

// List View Course Card
const CourseCardList = ({ course, onDelete }) => {
  const statusColors = {
    published: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    archived: 'bg-gray-100 text-gray-800',
  };

  //  Same thumbnail helper
  const getCourseThumbnail = () => {
    if (course.image && course.image.length > 0 && course.image[0]) {
      return course.image[0];
    }
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120"%3E%3Crect width="200" height="120" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%239ca3af"%3ECourse%3C/text%3E%3C/svg%3E';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center gap-6 hover:shadow-lg transition">
      {/* Thumbnail */}
      <img
        src={getCourseThumbnail()}
        alt={course.title}
        className="w-full md:w-48 h-32 object-cover rounded-lg flex-shrink-0 bg-gray-200"
        onError={(e) => {
          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120"%3E%3Crect width="200" height="120" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E';
        }}
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">
              {course.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {course.description}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusColors[course.status || 'draft']}`}>
            {(course.status || 'DRAFT').toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-sm">
            <span className="text-gray-500 block">Students</span>
            <span className="font-semibold text-gray-800">{course.students_count || 0}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500 block">Lessons</span>
            <span className="font-semibold text-gray-800">{course.lessons_count || course.courseModules?.length || 0}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500 block">Rating</span>
            <span className="font-semibold text-gray-800">
              ⭐ {course.avg_rating ? parseFloat(course.avg_rating).toFixed(1) : 'N/A'}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500 block">Revenue</span>
            <span className="font-semibold text-green-600">${course.total_revenue || course.price || 0}</span>
          </div>
        </div>

        {/* Actions -  Use _id */}
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/edit_course/${course._id}`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-semibold transition"
          >
            <FaEdit className="inline mr-1" /> Edit
          </Link>
          <Link
            to={`/course_analytics/${course._id}`}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-semibold transition"
          >
            <FaEye className="inline mr-1" /> Analytics
          </Link>
          <Link
            to={`/course_students/${course._id}`}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-semibold transition"
          >
            <FaUsers className="inline mr-1" /> Students
          </Link>
          <button
            onClick={() => onDelete(course._id)}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-semibold transition"
          >
            <FaTrash className="inline mr-1" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
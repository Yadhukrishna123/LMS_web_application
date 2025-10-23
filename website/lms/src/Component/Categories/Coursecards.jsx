import React, { useState, useEffect } from 'react';
import { FaHeart, FaBullseye, FaShieldAlt, FaPuzzlePiece, FaMicrophone } from "react-icons/fa";


const CourseCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Icon mapping - you can customize this based on your category names
  const iconMap = {
    'Frontend': FaHeart,
    'Backend': FaPuzzlePiece,
    'Security': FaShieldAlt,
    'Full-Stack': FaMicrophone,
    'default': FaBullseye
  };

  const getIconForCategory = (title) => {
    const Icon = iconMap[title] || iconMap.default;
    return <Icon className="w-6 h-6" />;
  };

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("http://localhost:8080/api/v1/view_All_categories?page=1&limit=1000");
        const data = await response.json();
        
        if (data.data) {
          setCategories(data.data.slice(0, 7)); // Show first 7 categories
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Fallback demo data if API fails
        setCategories([
          {
            _id: '1',
            title: 'Web Development Intro',
            description: 'Ready to start your web development journey?',
            courseCount: 0,
            category: 'HTML, CSS & Javascript'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    getAllCategories();
  }, []);

  if (loading) {
    return (
      <div className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Courses Categories
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            A comprehensive selection of courses designed to empower you with
            the skills you need to thrive in the dynamic world of web development.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => {
            // First card is larger and highlighted
            const isMainCard = index === 0;
            
            return (
              <div
                key={category._id}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                  isMainCard 
                    ? 'lg:col-span-2 lg:row-span-2 h-[520px]' 
                    : 'h-[250px]'
                } hover:scale-105 hover:shadow-2xl`}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      index === 0 ? '1498050108023-c5249f4df085' :
                      index === 1 ? '1487058792252-fa8eac87a087' :
                      index === 2 ? '1526374965328-7f61d4dc18c5' :
                      index === 3 ? '1555066931-4365d14bab8c' :
                      '1504384308090-c894fdcc538d'
                    }?w=800&q=80`}
                    alt={category.title}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500"
                  />
                </div>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  {/* Icon */}
                  <div className="flex justify-start">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform duration-300">
                      {getIconForCategory(category.title)}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="text-white">
                    {category.category && (
                      <p className="text-sm text-gray-300 mb-2 font-medium">
                        {category.category}
                      </p>
                    )}
                    <h3 className={`font-bold mb-2 ${
                      isMainCard ? 'text-3xl' : 'text-xl'
                    }`}>
                      {category.title}
                    </h3>
                    {isMainCard && category.description && (
                      <p className="text-gray-300 mb-4">
                        {category.description}
                      </p>
                    )}
                    {category.courseCount !== undefined && (
                      <p className="text-sm text-gray-400">
                        {category.courseCount} Courses
                      </p>
                    )}
                    {isMainCard && (
                      <button className="mt-4 bg-white text-gray-900 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        ENROLL NOW
                      </button>
                    )}
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-2xl transition-colors duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseCategories;
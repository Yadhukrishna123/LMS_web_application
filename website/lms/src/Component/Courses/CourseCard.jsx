import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, BarChart, Star, BookOpen } from 'lucide-react';

const CourseCard = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                    gap-4 sm:gap-5 md:gap-6 px-1 sm:px-0">
      {courses.length > 0 ? (
        courses.map((c) => (
          <Link
            to={`/detailpage/${c._id}`}
            key={c._id}
            className="group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl 
                       overflow-hidden flex flex-col transition-all duration-300 
                       border border-gray-100 hover:border-purple-200 
                       hover:-translate-y-1 active:scale-[0.98]"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden">
              <img
                src={c.image?.[0] || "/placeholder_course.jpg"}
                alt={c.title}
                onError={(e) => (e.target.src = "/placeholder_course.jpg")}
                className="w-full h-40 sm:h-44 md:h-48 object-cover 
                           group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Category Badge */}
              {c.category && (
                <span className="absolute top-2 sm:top-3 left-2 sm:left-3 
                                 bg-white/90 backdrop-blur-sm text-purple-700 
                                 text-[10px] sm:text-xs font-semibold 
                                 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-sm">
                  {c.category}
                </span>
              )}
              
              {/* Price Badge */}
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 
                              bg-gradient-to-r from-purple-600 to-indigo-600 
                              text-white text-xs sm:text-sm font-bold 
                              px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg">
                {c.price ? `₹${c.price.toLocaleString()}` : 'Free'}
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1.5 sm:mb-2 
                             line-clamp-2 group-hover:text-purple-700 transition-colors 
                             leading-snug">
                {c.title}
              </h3>

              {/* Instructor */}
              <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-100 
                                flex items-center justify-center flex-shrink-0">
                  <User size={12} className="text-purple-600 sm:w-3.5 sm:h-3.5" />
                </div>
                <span className="text-xs sm:text-sm text-gray-600 truncate">
                  {c.instructorDetails?.name || "Expert Instructor"}
                </span>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3 
                              text-[10px] sm:text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <BarChart size={12} className="text-purple-500 sm:w-3.5 sm:h-3.5" />
                  <span>{c.level || 'All Levels'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} className="text-purple-500 sm:w-3.5 sm:h-3.5" />
                  <span>{c.duration || 'Self-paced'}</span>
                </div>
                {c.lessonsCount && (
                  <div className="flex items-center gap-1">
                    <BookOpen size={12} className="text-purple-500 sm:w-3.5 sm:h-3.5" />
                    <span>{c.lessonsCount} lessons</span>
                  </div>
                )}
              </div>

              {/* Rating */}
              {c.rating && (
                <div className="flex items-center gap-1 mb-2 sm:mb-3">
                  <Star size={12} className="text-yellow-400 fill-yellow-400 sm:w-3.5 sm:h-3.5" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    {c.rating}
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-400">
                    ({c.reviewsCount || 0} reviews)
                  </span>
                </div>
              )}

              {/* Tags */}
              {c.tags && c.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                  {c.tags.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-50 text-purple-600 rounded-full 
                                 px-2 sm:px-2.5 py-0.5 
                                 text-[10px] sm:text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {c.tags.length > 2 && (
                    <span className="text-[10px] sm:text-xs text-gray-400">
                      +{c.tags.length - 2} more
                    </span>
                  )}
                </div>
              )}

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 
                            line-clamp-2 flex-grow leading-relaxed">
                {c.description}
              </p>

              {/* Action Button */}
              <button className="w-full py-2 sm:py-2.5 
                                 bg-gradient-to-r from-purple-600 to-indigo-600 
                                 hover:from-purple-700 hover:to-indigo-700 
                                 active:from-purple-800 active:to-indigo-800
                                 text-white rounded-lg sm:rounded-xl 
                                 text-sm sm:text-base font-medium 
                                 transition-all duration-200 
                                 shadow-sm hover:shadow-md active:scale-[0.98]
                                 flex items-center justify-center gap-1.5 sm:gap-2">
                <BookOpen size={14} className="sm:w-4 sm:h-4" />
                View Course
              </button>
            </div>
          </Link>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center 
                        py-10 sm:py-12 md:py-16 px-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 
                          bg-purple-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <BookOpen size={28} className="text-purple-400 sm:w-9 sm:h-9 md:w-10 md:h-10" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1.5 sm:mb-2 text-center">
            No Courses Found
          </h3>
          <p className="text-sm sm:text-base text-gray-500 text-center max-w-xs sm:max-w-md">
            We couldn't find any courses matching your criteria. Try adjusting your filters or search terms.
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
import React from 'react';
import { FaBookOpen, FaGraduationCap, FaAward, FaVideo, FaPlay } from "react-icons/fa";

const LearningExperience = () => {
  const features = [
    {
      icon: <FaBookOpen className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      title: "Top Quality Content",
      desc: "Learn from industry professionals with real-world experience and cutting-edge knowledge",
      color: "bg-blue-500"
    },
    {
      icon: <FaGraduationCap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      title: "Expert Instructors",
      desc: "Comprehensive curriculum taught by skilled educators covering modern technologies",
      color: "bg-pink-500"
    },
    {
      icon: <FaAward className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      title: "Interactive Learning",
      desc: "World-class quizzes and assessments to reinforce your understanding and track progress",
      color: "bg-orange-500"
    },
    {
      icon: <FaVideo className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      title: "Get Certified",
      desc: "Earn recognized certificates and showcase your achievements to advance your career",
      color: "bg-cyan-500"
    }
  ];

  return (
    <div className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-5 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">

          {/* Left Column - Content */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-5 sm:mb-6 md:mb-8 leading-tight">
              Premium Learning Experience
            </h1>

            <div className="space-y-4 sm:space-y-5 md:space-y-6 text-gray-600 mb-6 sm:mb-8 md:mb-10">
              <p className="text-sm sm:text-base leading-relaxed">
                Transform your career with our comprehensive LMS platform. Access world-class courses designed by industry experts to accelerate your professional growth and unlock new opportunities.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                Join thousands of successful learners who have achieved their goals through our interactive learning experience. Our platform combines cutting-edge technology with proven teaching methods to deliver measurable results and career advancement.
              </p>
            </div>

            {/* Video Card */}
            <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 
                            bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 
                            shadow-sm hover:shadow-md transition-shadow w-full sm:w-auto">
              <div className="relative flex-shrink-0 w-full sm:w-auto">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80"
                  alt="Study video"
                  className="w-full sm:w-28 h-32 sm:h-20 object-cover rounded-lg sm:rounded-xl"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full 
                                  flex items-center justify-center shadow-lg 
                                  hover:scale-110 active:scale-95 transition-transform cursor-pointer">
                    <FaPlay className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-gray-900 font-semibold text-sm sm:text-base">
                  Discover how our LMS works,
                </p>
                <p className="text-gray-600 text-xs sm:text-sm">Watch intro video</p>
              </div>
            </div>
          </div>

          {/* Right Column - Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl sm:rounded-2xl 
                           p-5 sm:p-6 md:p-8 
                           shadow-sm hover:shadow-lg transition-all duration-300 
                           border border-gray-100
                           flex sm:block items-center sm:items-start gap-4 sm:gap-0"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 
                                 ${feature.color} rounded-full 
                                 flex items-center justify-center text-white 
                                 mb-0 sm:mb-4 md:mb-6 shadow-md flex-shrink-0`}>
                  {feature.icon}
                </div>
                <div className="flex-1 sm:flex-none">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningExperience;
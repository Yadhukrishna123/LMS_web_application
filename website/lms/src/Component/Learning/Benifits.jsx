import React, { useState } from 'react';
import { FaPlay, FaUserGraduate, FaHome, FaCog, FaFlag } from 'react-icons/fa';

const Benefits = () => {
  const features = [
    { icon: <FaUserGraduate />, title: "Expert Tutor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In interdum tortor aliquam nisl." },
    { icon: <FaHome />, title: "Lifetime Access", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In interdum tortor aliquam nisl." },
    { icon: <FaCog />, title: "Updated Material", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In interdum tortor aliquam nisl." },
    { icon: <FaFlag />, title: "Weekly Event", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In interdum tortor aliquam nisl." },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Features */}
        <div>
          {features.map((feature) => (
            <div key={feature.title} className="flex items-center space-x-4 mb-6">
              <div className="bg-purple-500 text-white p-3 rounded-md text-lg">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                <p className="text-gray-600 text-sm mt-1">{feature.desc}</p>
              </div>
            </div>
          ))}
          <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition">
            Get Started
          </button>
        </div>

        {/* Right: Text and Image */}
        <div>
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">
            Making Your Learning More Enjoyable
          </h2>
          <p className="text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed tincidunt velit. Donec bibendum turpis vitae maximus bibendum. Mauris aliquam sapien eget ipsum dictum, eget euismod nisl consequat. Maecenas mattis, dui condimentum aliquet eleifend, enim nulla pharetra nunc.
          </p>

          <div className="relative rounded-xl shadow-lg overflow-hidden">
            <img
              src="https://img.freepik.com/free-photo/smiling-student-holding-folders_171337-271.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Student holding folders"
              className="rounded-xl w-full"
            />
            <button
              onClick={() => setIsOpen(true)}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 backdrop-blur-md p-5 rounded-full shadow-lg hover:scale-110 transition"
            >
              <FaPlay className="text-purple-600 text-xl" />
            </button>
          </div>

          {/* Modal */}
          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl w-full relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
                >
                  &times;
                </button>
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Learning Preview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Benefits;

import React from "react";
import { FaChalkboardTeacher, FaBookOpen, FaVideo } from "react-icons/fa";

const features = [
  {
    icon: <FaChalkboardTeacher className="text-purple-600 text-2xl" />,
    title: "Online courses from experts",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    icon: <FaBookOpen className="text-purple-600 text-2xl" />,
    title: "Over 500+ high quality topics",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    icon: <FaVideo className="text-purple-600 text-2xl" />,
    title: "Occasional video update",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const LearningExp = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Image + CTA */}
        <div className="relative">
          <img
            src="https://img.freepik.com/free-photo/smiling-student-holding-folders_171337-271.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Smiling student"
            className="rounded-xl shadow-lg"
          />
          <div className="absolute bottom-6 left-6 bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-lg shadow-md max-w-sm">
            <h3 className="text-xl font-semibold text-purple-700 mb-2">
              Quality online courses for all!
            </h3>
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
              Get Started
            </button>
          </div>
        </div>

        {/* Right: Features */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
            Premium Learning Experience
          </h2>
          <p className="text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed tincidunt velit. Donec bibendum turpis vitae maximus bibendum.
          </p>
          <div className="space-y-6">
            {features.map((f, index) => (
              <div key={index} className="flex items-start gap-4">
                <div>{f.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-800">{f.title}</h4>
                  <p className="text-sm text-gray-600">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningExp;

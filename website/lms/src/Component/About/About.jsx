import React, { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaPhoneAlt,
} from "react-icons/fa";
import "./About.css";

const images = [
  {
    src: "https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/college-student-YCNL3GU-1.png",
    alt: "Student 1",
  },
  {
    src: "https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/students-and-teacher-RVRHBBJ-1.png",
    alt: "Students and Teacher",
  },
  {
    src: "https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/girl-in-college-MGZDENU-1.png",
    alt: "Student 2",
  },
];

const statsData = [
  { icon: <FaUserGraduate />, value: 10200, label: "Students" },
  { icon: <FaChalkboardTeacher />, value: 50, label: "Instructors" },
  { icon: <FaBookOpen />, value: 10, label: "Courses" },
  { icon: <FaPhoneAlt />, value: 24, label: "Support (hrs)" },
];

const About = () => {
  const [counts, setCounts] = useState(
    statsData.map(() => 0) 
  );

  useEffect(() => {
    const duration = 2000; 
    const frameRate = 30; 
    const totalFrames = Math.round((duration / 1000) * frameRate);

    statsData.forEach((stat, index) => {
      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentValue = Math.floor(stat.value * progress);
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = currentValue;
          return newCounts;
        });
        if (frame === totalFrames) clearInterval(counter);
      }, duration / totalFrames);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 space-y-10 sm:space-y-12 md:space-y-16">
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
        About
      </h2>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="bg-blue-100 rounded-lg overflow-hidden shadow-lg 
                       w-full sm:w-64 md:w-72 
                       h-80 sm:h-96"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Little Somebodies Are What We Do
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          delectus, modi ducimus dicta aliquid molestias explicabo
          necessitatibus quae fugiat, eligendi, aliquam quibusdam. Maiores nihil
          ad officiis consequatur neque tempore pariatur?
        </p>
      </div>

      <section className="space-y-8 sm:space-y-10 md:space-y-12">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
          Our Story
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-10 md:gap-12">
          <div className="flex-1 space-y-8 sm:space-y-10 md:space-y-12 w-full px-2">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-2 sm:mb-3">
                Our Mission
              </h3>
              <p className="text-gray-600 text-sm sm:text-base max-w-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.!
              </p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-2 sm:mb-3">
                Our Vision
              </h3>
              <p className="text-gray-600 text-sm sm:text-base max-w-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.!
              </p>
            </div>
          </div>

          <div className="flex-1 shadow-lg rounded-lg overflow-hidden bg-blue-50 w-full">
            <img
              src="https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/cheerful-bearded-senior-european-man-smiles-gladfu-BSUDYSL-1.png"
              alt="Our Story"
              className="object-cover w-full h-64 sm:h-80 md:h-96 lg:h-[400px]"
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-10 sm:py-12 md:py-16 px-3 sm:px-4 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 sm:mb-3 px-2">
          Explore Our Impressive Stats
        </h2>
        <p className="text-gray-400 text-center text-sm sm:text-base md:text-lg max-w-xl mb-8 sm:mb-10 md:mb-14 px-2">
          We take pride in our commitment to excellence and our dedication to
          your success.
        </p>

        <div className="w-full max-w-6xl grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-4"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl text-gray-700 mb-2 sm:mb-3 md:mb-4">
                {stat.icon}
              </div>
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1">
                {counts[idx].toLocaleString()}
                {stat.label === "Support (hrs)" ? "+" : ""}
              </span>
              <span className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-6 flex justify-center bg-white">
        <div className="flex flex-col md:flex-row max-w-6xl gap-8 sm:gap-10 md:gap-12 items-center w-full">
          
          {/* Image Stack - Hidden on small mobile, shown from sm+ */}
          <div className="hidden sm:block relative w-full md:w-1/2 h-64 sm:h-80 md:h-96">
            <div className="absolute top-0 left-0 w-48 sm:w-56 md:w-64 lg:w-72 
                            h-48 sm:h-56 md:h-64 lg:h-72 
                            rounded-xl overflow-hidden shadow-lg border-2 sm:border-4 border-white z-10">
              <img
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
                alt="Student learning"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-16 sm:top-20 md:top-24 
                            left-20 sm:left-24 md:left-28 lg:left-32 
                            w-48 sm:w-56 md:w-64 lg:w-72 
                            h-48 sm:h-56 md:h-64 lg:h-72 
                            rounded-xl overflow-hidden shadow-lg border-2 sm:border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
                alt="Group study session"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Single Image for Mobile */}
          <div className="block sm:hidden w-full rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
              alt="Student learning"
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-3 sm:gap-4 px-2">
            <span className="uppercase font-semibold text-purple-600 text-xs sm:text-sm">
              Enhance Your Skills
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              Learn Anything You Want Today
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Learn from the best instructors online and advance your skills in
              a flexible and effective way. Join thousands of students achieving
              their goals every day.
            </p>
            <button className="bg-purple-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 
                               text-sm sm:text-base rounded-full shadow 
                               hover:bg-purple-700 active:bg-purple-800 
                               transition-all active:scale-95 
                               w-full sm:w-auto">
              Get In Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
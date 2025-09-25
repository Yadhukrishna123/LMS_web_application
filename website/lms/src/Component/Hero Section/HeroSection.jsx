import React from "react";

const HeroSection = () => {
  return (
    <div>
      <section className="text-center py-20 bg-blue-50">
        <h1 className="text-4xl font-bold mb-4">
          The Best Online Course You'll Find
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We have a large library of courses taught by highly skilled
          instructors.
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <button className="bg-blue-600 text-white px-6 py-2 rounded">
            Get Started
          </button>
          <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded">
            Demo Video
          </button>
        </div>
        <div className="flex justify-center gap-10 text-gray-700">
          <div>
            <strong>500+</strong> Courses
          </div>
          <div>
            <strong>10K+</strong> Students
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;

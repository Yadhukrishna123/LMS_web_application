import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const mentors = [
  {
    name: 'Stan McGyver',
    title: 'Mentor',
    image: 'https://randomuser.me/api/portraits/men/41.jpg',
  },
  {
    name: 'Gordon Stone',
    title: 'Mentor',
    image: 'https://randomuser.me/api/portraits/men/42.jpg',
  },
  {
    name: 'Lisa Rosse',
    title: 'Mentor',
    image: 'https://randomuser.me/api/portraits/women/43.jpg',
  },
  {
    name: 'Mulan Park',
    title: 'Mentor',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

const Mentors = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
        Meet Our Mentors
      </h2>
      <p className="text-gray-600 max-w-3xl mx-auto mb-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed tincidunt velit. Donec bibendum turpis vitae maximus bibendum.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {mentors.map((mentor) => (
          <div key={mentor.name} className="bg-gray-50 shadow-md rounded-lg p-6">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="h-24 w-24 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="font-bold text-purple-700">{mentor.name}</p>
            <p className="text-sm text-gray-500 mb-4">{mentor.title}</p>
            <div className="flex justify-center gap-4 text-purple-600 text-lg">
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <button className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition">
          View More
        </button>
      </div>
    </section>
  );
};

export default Mentors;

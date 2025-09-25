import React from 'react';
import { FaPen, FaUserFriends, FaGlobe, FaSuitcase } from 'react-icons/fa';

const categories = [
  {
    icon: <FaPen className="text-2xl text-purple-500" />,
    title: 'Writing',
    desc: 'Lorem ipsum dolor sit amet, consec tetur adipiscing elit.'
  },
  {
    icon: <FaUserFriends className="text-2xl text-purple-500" />,
    title: 'Design',
    desc: 'Lorem ipsum dolor sit amet, consec tetur adipiscing elit.'
  },
  {
    icon: <FaGlobe className="text-2xl text-purple-500" />,
    title: 'Website',
    desc: 'Lorem ipsum dolor sit amet, consec tetur adipiscing elit.',
    highlight: true
  },
  {
    icon: <FaSuitcase className="text-2xl text-purple-500" />,
    title: 'Business',
    desc: 'Lorem ipsum dolor sit amet, consec tetur adipiscing elit.'
  }
];

const CategoryBrowser = () => (
  <section className="py-14 text-center">
    <h2 className="text-4xl font-semibold mb-2">Browse By Category</h2>
    <p className="text-gray-500 max-w-2xl mx-auto mb-10">
      Integer suscipit justo vel iaculis scelerisque. Nam vel porta augue. Proin egestas leo magna, vel tincidunt magna laoreet eu.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 justify-items-center max-w-5xl mx-auto">
      {categories.map((cat, idx) => (
        <div
          key={cat.title}
          className={`bg-white border rounded-xl p-8 w-64 text-center shadow-sm transition ${
            cat.highlight
              ? "bg-gradient-to-r from-blue-50 to-purple-50 border-0"
              : "hover:shadow-md"
          }`}
        >
          <div className="flex justify-center mb-4">
            {cat.icon}
          </div>
          <h3 className="font-semibold text-lg mb-2">{cat.title}</h3>
          <p className="text-gray-500 text-sm">{cat.desc}</p>
        </div>
      ))}
    </div>
    <button className="bg-purple-500 text-white px-8 py-2 rounded-full text-base hover:bg-purple-600 transition shadow">
      Browse All
    </button>
  </section>
);

export default CategoryBrowser;

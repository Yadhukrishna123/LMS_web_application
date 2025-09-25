import React from 'react';

const testimonials = [
  {
    name: 'Maya Santos',
    title: 'Student',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Conubia consectetur tellus quis lacinia lorem porttitor.',
  },
  {
    name: 'Jake Paulin',
    title: 'Student',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Conubia consectetur tellus quis lacinia lorem porttitor.',
  },
  {
    name: 'Nick Adelman',
    title: 'Student',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Conubia consectetur tellus quis lacinia lorem porttitor.',
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-50 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
        What Our Students Say
      </h2>
      <p className="text-gray-600 max-w-3xl mx-auto mb-10">
        Ut eget metus lacus, sit amet accumsan erat. Integer suscipit justo vel laoreet sollicitudin. Nam vel porta augue. Proin vulputate leo magna, vel tincidunt magna laoreet eu.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((student) => (
          <div key={student.name} className="bg-white shadow-md rounded-lg p-6 text-left">
            <img
              src={student.image}
              alt={student.name}
              className="h-20 w-20 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="italic text-gray-700 text-center">"{student.quote}"</p>
            <div className="mt-4 text-center">
              <p className="font-bold text-purple-700">{student.name}</p>
              <p className="text-sm text-gray-500">{student.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots (static for now) */}
      <div className="flex justify-center gap-2 mt-10">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-3 w-3 rounded-full bg-purple-300 hover:bg-purple-500 transition"
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

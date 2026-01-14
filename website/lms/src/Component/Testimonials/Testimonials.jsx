import React, { useState } from 'react';

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

const styleSheet = `
@keyframes scrollLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scrollLeftMobile {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
`;

const Testimonials = () => {
  const [isPaused, setIsPaused] = useState(false);
  const testimonialsForScroll = [...testimonials, ...testimonials];

  const scrollAnimationStyle = {
    animation: 'scrollLeft 3s linear infinite',
    animationPlayState: isPaused ? 'paused' : 'running',
    willChange: 'transform',
  };

  // Handle touch events for mobile
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);

  return (
    <>
      <style>{styleSheet}</style>
      <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-6 md:px-12 lg:px-24 bg-gray-50">
        {/* Responsive heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center px-2">
          What Our Students Say
        </h2>
        
        {/* Responsive description */}
        <p className="text-sm sm:text-base text-gray-600 max-w-4xl mx-auto mb-8 sm:mb-12 text-center px-2 leading-relaxed">
          Ut eget metus lacus, sit amet accumsan erat. Integer suscipit justo vel laoreet sollicitudin. Nam vel porta augue. Proin vulputate leo magna, vel tincidunt magna laoreet eu.
        </p>

        {/* Scrolling container */}
        <div className="overflow-hidden mx-auto max-w-full mb-2 sm:mb-3">
          <div
            className="flex flex-nowrap gap-4 sm:gap-6 md:gap-8"
            style={scrollAnimationStyle}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {testimonialsForScroll.map((student, index) => (
              <div
                key={index + student.name}
                className="bg-white shadow-md rounded-lg p-4 sm:p-5 md:p-6 text-left flex-shrink-0 
                           w-[260px] xs:w-[280px] sm:w-64 md:w-72 
                           hover:shadow-xl transition-shadow duration-300 mb-2 sm:mb-3"
              >
                {/* Responsive avatar */}
                <img
                  src={student.image}
                  alt={student.name}
                  className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-full mx-auto mb-3 sm:mb-4 object-cover"
                />
                
                {/* Responsive quote */}
                <p className="italic text-gray-700 text-center mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed line-clamp-4">
                  "{student.quote}"
                </p>
                
                {/* Responsive name and title */}
                <div className="mt-2 text-center">
                  <p className="font-bold text-purple-700 text-sm sm:text-base">{student.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{student.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile indicator - tap to pause hint */}
        <p className="text-center text-xs text-gray-400 mt-2 sm:hidden">
          Tap to pause
        </p>
      </section>
    </>
  );
};

export default Testimonials;
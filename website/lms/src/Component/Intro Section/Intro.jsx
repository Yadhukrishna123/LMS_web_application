import React from 'react'

const Intro = () => {
  return (
    <div>
      <section className="text-center py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 leading-tight">
          Providing Amazing Online Courses
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-5 md:mb-6 max-w-lg mx-auto">
          Learn from the best instructors at your own pace.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
                           text-white text-sm sm:text-base
                           px-5 sm:px-6 py-2.5 sm:py-3 
                           rounded-lg transition-colors duration-200
                           active:scale-95 shadow-md hover:shadow-lg">
          Get Started
        </button>
      </section>
    </div>
  )
}

export default Intro
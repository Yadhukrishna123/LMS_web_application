import React from 'react'
import "./Home2.css"

const Home2 = () => {
    return (
        <div className='mt-5 px-4 sm:px-0'>
            <div className="w-full sm:w-[90%] md:w-[85%] bg-blue-200 min-h-[400px] sm:min-h-[450px] md:h-[500px] flex flex-col lg:flex-row mx-auto relative rounded-2xl sm:rounded-3xl overflow-hidden">
                <img
                    src="https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/studio-shot-of-cute-thankful-clever-student-feels-RP65PDL-1.png"
                    alt="Student"
                    className="w-full sm:w-auto h-[200px] sm:h-[280px] md:h-[350px] lg:h-[420px] 
                               object-contain lg:object-contain 
                               relative lg:absolute 
                               lg:left-0 lg:top-1/2 lg:transform lg:-translate-y-1/2
                               z-10 lg:z-[2] 
                               rounded-t-2xl lg:rounded-[32px]
                               mx-auto lg:mx-0"
                />
                <div className='flex-1 flex flex-col justify-center items-center lg:items-end 
                                p-6 sm:p-8 md:p-10 lg:pr-20 text-center lg:text-right
                                lg:ml-auto'>
                    <div className='max-w-full lg:max-w-[500px]'>
                        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'>
                            Providing Amazing Online Courses
                        </h2>
                    </div>
                    <div className='mt-4 sm:mt-5'>
                        <p className='text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 
                                      max-w-full lg:max-w-[450px]'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus dicta, corporis sint cumque officiis quos repudiandae.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home2
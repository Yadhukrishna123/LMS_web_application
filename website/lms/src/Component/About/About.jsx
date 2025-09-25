import React from 'react'
import "./About.css"

const About = () => {
  return (
    <div>
        <div className='mt-10'>
            <h2 className='text-center text-4xl'>About</h2>
        </div>

        <div className='about-imgs'>
            <div className='bg-blue-200 h-full ml-3'>
                <img src="https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/college-student-YCNL3GU-1.png" alt="" />
            </div>
            <div className='bg-blue-200 h-full ml-3'>
                <img src="https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/students-and-teacher-RVRHBBJ-1.png" alt="" />
            </div>
            <div className='bg-blue-200 h-full ml-3'>
                <img src="https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/girl-in-college-MGZDENU-1.png" alt="" />
            </div>
        </div>

        <div className='title'>
            <h1 className='text-5xl mt-7 mx-auto'>Little Somebodies Are What We Do</h1>
            <p className='w-[65%] mx-auto mt-6 text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos delectus, modi ducimus dicta aliquid molestias explicabo necessitatibus quae fugiat, eligendi, aliquam quibusdam. Maiores nihil ad officiis consequatur neque tempore pariatur?</p>
        </div>

        <div className='mt-10'>
            <div>
                <h2 className='text-center text-5xl'>Our storty</h2>
            </div>

            <div className='our-story'>
                <div className='our-story-sectios-one'>
                    <div className=''>
                        <h4 className='font-semibold text-3xl missionTitle'>Our  mission</h4>
                        <p className='mt-3 w-[50%] text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.!</p>
                    </div>
                    <div className=''>
                         <h4 className='font-semibold text-3xl'>Our  vision</h4>
                          <p className='mt-3 w-[50%] text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.!</p>
                    </div>
                </div>
                <div className='our-story-sectios-two bg-blue-100'>
                    <img className='h-[400px] w-full' src="https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/cheerful-bearded-senior-european-man-smiles-gladfu-BSUDYSL-1.png" alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default About
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Component/Home/Home'
import Header from './Component/Header/Header'
import Contact from './Component/Contact/Contact'
<<<<<<< HEAD
import CoursesSection from './Component/Courses/Courses'
import LearningExp from './Component/LearningExp/LearningExp'
import Detailpage from './Component/Courses/Detailpage'
import Testimonials from './Component/Testimonials/Testimonials'
import CategoryBrowser from './Component/Categories/Coursecards'
import Mentors from './Component/Mentors/Mentors'
=======

import About from './Component/About/About'
// import Courses from './Component/Courses/Courses'

import CoursesSection from './Component/Courses/Courses'
import Signup from './Component/SignUp/Signup'
import Footer from './Component/Footer/Footer'
import Login from './Component/Login/Login'
import UserPage from './Component/UserPage/UserPage'

>>>>>>> yadhu-branch


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route path="/about" element={<LearningExp />} />
        <Route path="/detailpage/:id" element={<Detailpage />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/cateogeries" element={<CategoryBrowser />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/allcourses" element={<CoursesSection />} />
        <Route path="/contact" element={<Contact />} />
=======

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/courses" element={<Courses />} /> */}

        <Route path="/allcourses" element={<CoursesSection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sigh_up" element={<Signup />} />
         <Route path="/login" element={<Login />} />
          <Route path="/user_page" element={<UserPage />} />

>>>>>>> yadhu-branch

      </Routes>
    </BrowserRouter>
  )
}

export default App

import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Component/Home/Home'
import Header from './Component/Header/Header'
import Contact from './Component/Contact/Contact'
import CoursesSection from './Component/Courses/Courses'
import LearningExp from './Component/LearningExp/LearningExp'
import Detailpage from './Component/Courses/Detailpage'
import Testimonials from './Component/Testimonials/Testimonials'
import CategoryBrowser from './Component/Categories/Coursecards'
import Mentors from './Component/Mentors/Mentors'


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<LearningExp />} />
        <Route path="/detailpage/:id" element={<Detailpage />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/cateogeries" element={<CategoryBrowser />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/allcourses" element={<CoursesSection />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Component/Home/Home'
import Header from './Component/Header/Header'
import Contact from './Component/Contact/Contact'
import CoursesSection from './Component/Courses/Courses'
import Signup from './Component/SignUp/Signup'
import Footer from './Component/Footer/Footer'
import Login from './Component/Login/Login'


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allcourses" element={<CoursesSection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sigh_up" element={<Signup />} />
         <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App

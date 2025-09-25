import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Component/Home/Home'
import Header from './Component/Header/Header'
import Contact from './Component/Contact/Contact'
<<<<<<< HEAD
import About from './Component/About/About'
// import Courses from './Component/Courses/Courses'
=======
import CoursesSection from './Component/Courses/Courses'
import Signup from './Component/SignUp/Signup'
import Footer from './Component/Footer/Footer'
import Login from './Component/Login/Login'
>>>>>>> master


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/courses" element={<Courses />} /> */}
=======
        <Route path="/allcourses" element={<CoursesSection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sigh_up" element={<Signup />} />
         <Route path="/login" element={<Login />} />
>>>>>>> master
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App

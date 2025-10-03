import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Component/Home/Home'
import Header from './Component/Header/Header'
import Contact from './Component/Contact/Contact'
import Detailpage from './Component/Courses/Detailpage'
import Testimonials from './Component/Testimonials/Testimonials'
import CategoryBrowser from './Component/Categories/Coursecards'
import Signup from './Component/SignUp/Signup'
import Login from './Component/Login/Login'
import UserPage from './Component/UserPage/UserPage'
import CoursesSection from './Component/Courses/Courses'
import Footer from './Component/Footer/Footer'
import About from './Component/About/About'
import Context from './Component/AllCourseContext/Context'
import ForgetPaddword from './Component/ForgetPassword/ForgetPaddword'
import FoegetPasswordOne from './Component/ForgetPassword/FoegetPasswordOne'







function App() {

  return (
    <Context>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />


          <Route path="/about" element={<About />} />
          <Route path="/detailpage/:id" element={<Detailpage />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/cateogeries" element={<CategoryBrowser />} />

          <Route path="/allcourses" element={<CoursesSection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sign_up" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/enter_email" element={<FoegetPasswordOne />} />
          <Route path="/reset-password/:token" element={<ForgetPaddword />} />


          <Route path="/user_page" element={<UserPage />} />

          <Route path="/user_page" element={<UserPage />} />



        </Routes>
        <Footer />
      </BrowserRouter>
    </Context>

  )
}

export default App

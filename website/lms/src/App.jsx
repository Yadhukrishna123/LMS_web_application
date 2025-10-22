import { useContext, useState } from 'react'
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

import { AllCourseDetail } from './Component/AllCourseContext/Context'
import QuizList from './Component/Quiz/QuizList'
// import UserQuiz from './Component/Quiz/UserQuiz'
import FoegetPasswordOne from './Component/ForgetPassword/FoegetPasswordOne'
import ForgetPaddword from './Component/ForgetPassword/ForgetPaddword'
import ProtectedRoutes from './Utils/ProtectedRoutes'


import TakeQuiz from './Component/Quiz/UserQuiz'
import CheckoutPage from './Component/Purchase/CheckoutPage'
import PurchaseSucccessCard from './Component/Purchase/PurchaseSucccessCard'
import AddStudent from './Component/AddStudentDetails/AddStudent'
import Notification from './Component/NotificationPage/Notification'








function App() {
  const { authentication } = useContext(AllCourseDetail)

  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/enter_email" element={<FoegetPasswordOne />} />
        <Route path="/reset_password/:token" element={<ForgetPaddword />} />

        <Route path="/about" element={<About />} />
        <Route path="/detailpage/:id" element={<Detailpage />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/cateogeries" element={<CategoryBrowser />} />

        <Route path="/allcourses" element={<CoursesSection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign_up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/login" element={<Quizz />} /> */}


        <Route path="/user_page" element={<UserPage />} />
        {/* <Route path="/add_student_details" element={<AddStudent />} /> */}
        <Route path="/checkout/:courseId" element={<CheckoutPage />} />
        <Route path="/payment_success" element={<PurchaseSucccessCard />} />

         <Route path="/notification" element={<Notification />} />


        <Route path="/quizzes" element={<ProtectedRoutes isAuthentication={authentication}><QuizList /> </ProtectedRoutes>} />
        {/* <Route path="/take_quiz/:quizId" element={<UserQuiz userId={user?._id} />} /> */}


      </Routes>
      <Footer />
    </BrowserRouter>




  )
}

export default App

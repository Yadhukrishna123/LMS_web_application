import React, { useContext, useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import UploadVideos from './components/UploadRecordedVideo.jsx/UploadVideos';
import UploadedVideos from './components/UploadedVideos/UploadedVideos';
import UserEnquiries from './components/Enquiries/UserEnquiries';
import AddCourse from './components/AddCourse/AddCourse';
import AddCategory from './components/Cateogry/AddCategory';
import ViewCategory from './components/Cateogry/ViewCategory';
import ViewInstuctors from './components/Instructors/ViewInstructors';
// import AddInstuctors from './components/Instructors/AddInstructors';
import Users from './components/Users/Users';

import AddStudents from './components/Students/Addstudents';
import ViewStudents from './components/Students/Viewstudents';

import AddInstitution from './components/AddInstitution/AddInstitution';
import LoginInstitution from './components/AddInstitution/LoginInstitution';
import { AdminContext } from './components/AdminContext/Context';
import ProtectedRoutes from './utils/ProtectedRoutes';
import MyProfile from './components/MyProfile/MyProfile';
import CreateProfile from './components/CreateProfile/CreateProfile';
// import EditProfile from './components/CreateProfile/EditProfile';
import ViewCourses from './components/AddCourse/ViewCourse';
import ActiveBatches from './components/Batches/Activebatches';
import ScheduleBatch from './components/Batches/ScheduleBatch';
import AddInstructors from './components/Instructors/AddInstructors';

import ViewQuizes from './components/Quizes/ViewQuizes';
import Addquizes from './components/Quizes/Addquizes';
import QuizSubmissions from './components/Quizes/UserSubmission';
import AttendanceListing from './components/Attendence/AttendanceListing';
import Attenencetracking from './components/Attendence/Attenencetracking';



import EditProfile from './components/MyProfile/EditProfile';
import AddSchedule from './components/AddSchedule/AddSchedule';
import ViewSchedule from './components/AddSchedule/ViewSchedule';
import FeeDashBoard from './components/FeeManagement/FeeDashBoard';
import FeeStructure from './components/FeeManagement/FeeStructure';
import StudentFees from './components/FeeManagement/StudentFees';
import FeeCollection from './components/FeeManagement/FeeCollection';




function App() {
  const { auth } = useContext(AdminContext)

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>

      <Routes>
        <Route exact path="/" element={<Dashboard />} >
          <Route path="/upload_recorded_video" element={<ProtectedRoutes isAuthentication={auth}><UploadVideos /></ProtectedRoutes>} />
          <Route path="/recorded_sessions" element={<ProtectedRoutes isAuthentication={auth}><UploadedVideos /></ProtectedRoutes>} />
          <Route path="/user_enquiries" element={<ProtectedRoutes isAuthentication={auth}><UserEnquiries /></ProtectedRoutes>} />
          <Route path="/add_course" element={<ProtectedRoutes isAuthentication={auth}><AddCourse /></ProtectedRoutes>} />
          <Route path="/add_institution" element={<AddInstitution />} />
          <Route path="/add_course_cateogry" element={<AddCategory />} />
          <Route path="/view_course_cateogry" element={<ViewCategory />} />
          <Route path="/view_course" element={<ViewCourses />} />
          <Route path="/view_Instuctors" element={<ViewInstuctors />} />
          <Route path="/add_Instuctors" element={<AddInstructors />} />
          <Route path="/users" element={<ProtectedRoutes isAuthentication={auth}><Users /></ProtectedRoutes>} />
          <Route path="/login" element={<LoginInstitution />} />
          <Route path="/my_profile" element={<ProtectedRoutes isAuthentication={auth}><MyProfile /></ProtectedRoutes>} />
          <Route path="/create_profile" element={<ProtectedRoutes isAuthentication={auth}><CreateProfile /></ProtectedRoutes>} />
          {/* <Route path="/edit_profile" element={<ProtectedRoutes isAuthentication={auth}><EditProfile /></ProtectedRoutes>} /> */}
          <Route path="/Edit_profile/:id" element={<EditProfile />} />
          <Route path="/active_batches" element={<ActiveBatches />} />
          <Route path="/add_new_batches" element={<ScheduleBatch />} />
          <Route path="/add_schedule" element={<AddSchedule />} />
          <Route path="/view_schedules" element={<ViewSchedule />} />
          <Route path="/add_students" element={<AddStudents />} />
          <Route path="/view_students" element={<ViewStudents />} />

          <Route path="/add_quizes" element={<Addquizes />} />
          <Route path="/view_quizes" element={<ViewQuizes />} />
          <Route path="/submissions" element={<QuizSubmissions />} />

          <Route path="/attendence_tracking" element={<Attenencetracking />} />
          <Route path="/attendence_listing" element={<AttendanceListing />} />

          <Route path="/fee_dash_board" element={<FeeDashBoard />} />
          <Route path="/fee_structure" element={<FeeStructure />} />
           <Route path="/student_fees" element={<StudentFees />} />
                      <Route path="/fee_collection" element={<FeeCollection />} />



        </Route>
      </Routes>


    </>
  );
}

export default App;

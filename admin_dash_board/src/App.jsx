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
import AddInstuctors from './components/Instructors/AddInstructors';
import Users from './components/Users/Users';
<<<<<<< HEAD
import AddStudents from './components/Students/Addstudents';
import ViewStudents from './components/Students/Viewstudents';
=======
import AddInstitution from './components/AddInstitution/AddInstitution';
import LoginInstitution from './components/AddInstitution/LoginInstitution';
import { AdminContext } from './components/AdminContext/Context';
import ProtectedRoutes from './utils/ProtectedRoutes';
import MyProfile from './components/MyProfile/MyProfile';
import CreateProfile from './components/CreateProfile/CreateProfile';
import EditProfile from './components/CreateProfile/EditProfile';
>>>>>>> dashboard-branch


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
          <Route path="/add_course" element={<ProtectedRoutes isAuthentication={auth}><AddCourse /></ProtectedRoutes>} />
          <Route path="/add_institution" element={<AddInstitution />} />
          <Route path="/add_course_cateogry" element={<AddCategory />} />
          <Route path="/view_course_cateogry" element={<ViewCategory />} />
          <Route path="/add_Instuctors" element={<AddInstuctors />} />
          <Route path="/view_Instuctors" element={<ViewInstuctors />} />
          <Route path="/users" element={<ProtectedRoutes isAuthentication={auth}><Users /></ProtectedRoutes>} />
          <Route path="/login" element={<LoginInstitution />} />
          <Route path="/my_profile" element={<ProtectedRoutes isAuthentication={auth}><MyProfile /></ProtectedRoutes>} />
          <Route path="/create_profile" element={<ProtectedRoutes isAuthentication={auth}><CreateProfile /></ProtectedRoutes>} />
          <Route path="/edit_profile" element={<ProtectedRoutes isAuthentication={auth}><EditProfile /></ProtectedRoutes>} />


          <Route path="/add_students" element={<AddStudents />} />
          <Route path="/view_students" element={<ViewStudents />} />

        </Route>
      </Routes>


    </>
  );
}

export default App;

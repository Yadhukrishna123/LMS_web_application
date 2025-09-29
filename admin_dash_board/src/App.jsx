import React, { useEffect } from 'react';
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
import AdminViewCourses from './components/AddCourse/ViewCourse';

function App() {

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
          <Route path="/upload_recorded_video" element={<UploadVideos />} />
           <Route path="/recorded_sessions" element={<UploadedVideos />} />
            <Route path="/user_enquiries" element={<UserEnquiries />} />
              <Route path="/add_course" element={<AddCourse />} />
              <Route path="/view_course" element={<AdminViewCourses />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

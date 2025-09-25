import React from "react";
import Home1 from "../Home1/Home1";
import Home2 from "../Home2/Home2";
import Footer from "../Footer/Footer";
import Mentors from "../Mentors/Mentors";
import Testimonials from "../Testimonials/Testimonials";
import LearningExp from "../LearningExp/LearningExp";
import Benefits from "../Learning/Benifits";
import CoursesSection from "../Courses/Courses";
import CategoryBrowser from "../Categories/Coursecards";
import Contact from "../Contact/Contact";

const Home = () => {
  return (
    <div>
      <Home1 />
      <Home2 />
      <LearningExp />
      <CategoryBrowser />
      <Benefits />
      <CoursesSection />
      <Testimonials />
      <Mentors />
      
     
    </div>
  );
};

export default Home;

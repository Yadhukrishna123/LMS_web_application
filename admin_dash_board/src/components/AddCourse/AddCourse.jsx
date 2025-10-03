import React, { useState, useEffect } from "react";
import axios from "axios";
import BasicInfoForm from "./Add Course Splits/BasicInfoForm";
import CurriculumForm from "./Add Course Splits/CurriculumForm";
import InstructorForm from "./Add Course Splits/InstructorForm";
//import MediaForm from "./Add Course Splits/MediaForm";
import PricingForm from "./Add Course Splits/PricingForm";

const AddCourse = () => {
  const preset_key = "arsmfwi7";
  const cloud_name = "dnqlt6cit";

  const [courseData, setCourseData] = useState({
    title: "", description: "", overview: "", price: "", isFree: false,
    duration: "", level: "", category: "", tags: "",
    image: null,
    modules: [],
    instructorDetails: { name: "", bio: "", image: null, social: {} },
    media: { images: [], docs: [], trailer: null },
    pricing: { discount: "", currency: "USD", paymentType: "Paid" }
  });


  const [instructors, setInstructors] = useState([]);
  const [categories, setCategories] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const instRes = await axios.get("http://localhost:8080/api/v1/view_instructor");
      setInstructors(instRes.data.data);

      const catRes = await axios.get("http://localhost:8080/api/v1/view_All_categories")
      setCategories(catRes.data.data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };
  fetchData();
}, []);

  const updateCourseData = (field, value) => {
    setCourseData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let uploadedImages = [];

      if (courseData.image) {
        const formData = new FormData();
        formData.append("file", courseData.image);
        formData.append("upload_preset", preset_key);

        const imgRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData,
          { timeout: 60000 }
        );

        uploadedImages.push(imgRes.data.secure_url);
      }

      const payload = {
        ...courseData,
        image: uploadedImages,
      };

      console.log("Payload before POST:", payload);
      const res = await axios.post("http://localhost:8080/api/v1/create_course", payload);
      console.log("Saved:", res.data);
    } catch (err) {
      console.error("Error saving course", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-6">
      <h2 className="text-2xl font-bold text-center">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <BasicInfoForm
          data={courseData}
          updateData={updateCourseData}
          instructors={instructors}
          categories={categories}
        />
        <CurriculumForm data={courseData} updateData={updateCourseData} />
        <InstructorForm data={courseData} updateData={updateCourseData} />
        {/* <MediaForm data={courseData} updateData={updateCourseData} /> */}
        <PricingForm data={courseData} updateData={updateCourseData} />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Save Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;

import React, { useState, useEffect } from "react";
import axios from "axios";
import BasicInfoForm from "./Add Course Splits/BasicInfoForm";
import CurriculumForm from "./Add Course Splits/CurriculumForm";
import InstructorForm from "./Add Course Splits/InstructorForm";
import PricingForm from "./Add Course Splits/PricingForm";

const AddCourse = () => {
  const preset_key = "arsmfwi7";
  const cloud_name = "dnqlt6cit";

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    overview: "",
    price: "",
    isFree: false,
    duration: "",
    level: "",
    category: "",
    tags: "",
    image: null,
    modules: [],
    instructorDetails: { name: "", bio: "", image: null, social: {} },
    media: { images: [], docs: [], trailer: null },
    pricing: { discount: "", currency: "USD", paymentType: "Paid" },
  });

  const [instructors, setInstructors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch instructors and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const instRes = await axios.get("http://localhost:8080/api/v1/view_instructor");
        setInstructors(instRes.data.data);
        const catRes = await axios.get("http://localhost:8080/api/v1/view_All_categories");
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
    setLoading(true);
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

      const payload = { ...courseData, image: uploadedImages };
      await axios.post("http://localhost:8080/api/v1/create_course", payload);

      alert("✅ Course added successfully!");
      setCourseData({
        title: "",
        description: "",
        overview: "",
        price: "",
        isFree: false,
        duration: "",
        level: "",
        category: "",
        tags: "",
        image: null,
        modules: [],
        instructorDetails: { name: "", bio: "", image: null, social: {} },
        media: { images: [], docs: [], trailer: null },
        pricing: { discount: "", currency: "USD", paymentType: "Paid" },
      });
    } catch (err) {
      console.error("Error saving course", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl">
            <h3 className="text-white text-2xl font-bold">+</h3>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Add New Course</h2>
            <p className="text-gray-600">Enter course details, syllabus, and pricing information</p>
          </div>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h3 className="text-xl font-semibold text-white">Course Information</h3>
          </div>

          <div className="p-6 space-y-10">
            {/* A. Basic Info */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">A. Basic Info</h3>
              <BasicInfoForm
                data={courseData}
                updateData={updateCourseData}
                instructors={instructors}
                categories={categories}
              />
            </div>

            {/* B. Curriculum / Syllabus */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">B. Curriculum / Syllabus</h3>
              <CurriculumForm data={courseData} updateData={updateCourseData} />
            </div>

            {/* C. Instructor Details */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">C. Instructor Details</h3>
              <InstructorForm data={courseData} updateData={updateCourseData} />
            </div>

            {/* D. Pricing */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">D. Pricing</h3>
              <PricingForm data={courseData} updateData={updateCourseData} />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="reset"
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
                onClick={() =>
                  setCourseData({
                    title: "",
                    description: "",
                    overview: "",
                    price: "",
                    isFree: false,
                    duration: "",
                    level: "",
                    category: "",
                    tags: "",
                    image: null,
                    modules: [],
                    instructorDetails: { name: "", bio: "", image: null, social: {} },
                    media: { images: [], docs: [], trailer: null },
                    pricing: { discount: "", currency: "USD", paymentType: "Paid" },
                  })
                }
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 text-white font-semibold rounded-xl shadow-lg transition-all ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                }`}
              >
                {loading ? "Saving..." : "Save Course"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;

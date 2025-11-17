import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaPlus, FaTrash, FaTimes, FaBook, FaTag, FaClock, FaImage, FaDollarSign } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const CreateInstructorCourse = () => {
  const navigate = useNavigate();
  const preset_key = "arsmfwi7";
  const cloud_name = "dnqlt6cit";

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    isFree: false,
    duration: "",
    category: "",
    tags: "",
    hasMonthlyPayment: false,
    monthlyAmount: "",
    discount: "",
  });

  const [courseModules, setCourseModules] = useState([
    { id: 1, title: "", content: "" }
  ]);

  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/view_All_categories");
      if (res.data.allCoursecategory) {
        setCategories(res.data.allCoursecategory);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
      
      if (name === "isFree" && checked) {
        setFormData({ ...formData, isFree: true, price: "0" });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size should be less than 10MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    setUploadingImage(true);
    const imgData = new FormData();
    imgData.append("file", file);
    imgData.append("upload_preset", preset_key);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        imgData
      );
      setImage(res.data.secure_url);
      toast.success("Image uploaded successfully");
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Image upload failed");
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
    }
  };

  const addModule = () => {
    const newModule = {
      id: courseModules.length + 1,
      title: "",
      content: ""
    };
    setCourseModules([...courseModules, newModule]);
  };

  const removeModule = (id) => {
    if (courseModules.length === 1) {
      toast.error("At least one module is required");
      return;
    }
    setCourseModules(courseModules.filter(module => module.id !== id));
  };

  const updateModule = (id, field, value) => {
    setCourseModules(courseModules.map((module) =>
      module.id === id ? { ...module, [field]: value } : module
    ));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Please enter course title");
      return false;
    }
    if (!formData.description.trim()) {
      toast.error("Please enter course description");
      return false;
    }
    if (!formData.category) {
      toast.error("Please select a category");
      return false;
    }
    if (!formData.duration.trim()) {
      toast.error("Please enter course duration");
      return false;
    }
    if (!formData.isFree && (!formData.price || parseFloat(formData.price) <= 0)) {
      toast.error("Please enter a valid price");
      return false;
    }
    if (!image) {
      toast.error("Please upload a course image");
      return false;
    }

    const hasEmptyModule = courseModules.some(
      (module) => !module.title.trim()
    );

    if (hasEmptyModule) {
      toast.error("Please fill in all module titles");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        price: formData.isFree ? 0 : parseFloat(formData.price),
        isFree: formData.isFree,
        duration: formData.duration,
        category: formData.category,
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
        image: [image],
        courseModules: courseModules,
        hasMonthlyPayment: formData.hasMonthlyPayment,
        monthlyAmount: formData.hasMonthlyPayment ? parseFloat(formData.monthlyAmount) : 0,
        discount: formData.discount ? parseFloat(formData.discount) : 0
      };

      const res = await axios.post(
        "http://localhost:8080/api/v1/create-course",
        payload,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Course created successfully!");
        setTimeout(() => {
          navigate("/my_courses");
        }, 1500);
      }
    } catch (err) {
      console.error("Error creating course:", err);
      toast.error(err.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-4">
            <FaBook className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Create New Course
          </h1>
          <p className="text-gray-600">Share your knowledge with students worldwide</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="p-8 space-y-6">
              
              {/* Title */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaBook className="text-indigo-500" />
                  Course Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="e.g., Complete Web Development Bootcamp"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none"
                  placeholder="What will students learn in this course?"
                  required
                />
              </div>

              {/* Category & Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FaTag className="text-indigo-500" />
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat, i) => (
                      <option key={i} value={cat.title}>{cat.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FaClock className="text-indigo-500" />
                    Duration *
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    placeholder="e.g., 8 weeks"
                    required
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FaTag className="text-indigo-500" />
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="JavaScript, React, Node.js (comma separated)"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <FaImage className="text-indigo-500" />
                  Course Thumbnail *
                </label>
                
                {imagePreview ? (
                  <div className="relative group">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-64 object-cover rounded-2xl shadow-lg" 
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImage("");
                        setImagePreview(null);
                      }}
                      className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <FaTimes />
                    </button>
                    {uploadingImage && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-2xl">
                        <div className="text-white text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-2"></div>
                          <p className="font-semibold">Uploading...</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <label className="block cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-indigo-400 hover:bg-indigo-50 transition-all">
                      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaImage className="text-indigo-600 text-2xl" />
                      </div>
                      <p className="text-gray-600 font-medium mb-1">Click to upload image</p>
                      <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Modules */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Course Modules *
                </label>
                <div className="space-y-3">
                  {courseModules.map((module, i) => (
                    <div key={module.id} className="relative group">
                      <div className="p-5 border-2 border-gray-200 rounded-2xl hover:border-indigo-300 transition-all bg-gradient-to-br from-white to-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-bold text-indigo-600">Module {i + 1}</span>
                          {courseModules.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeModule(module.id)}
                              className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <FaTimes />
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="Module Title"
                          value={module.title}
                          onChange={(e) => updateModule(module.id, "title", e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                          required
                        />
                        <textarea
                          placeholder="Module description (optional)"
                          value={module.content}
                          onChange={(e) => updateModule(module.id, "content", e.target.value)}
                          rows="2"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  type="button"
                  onClick={addModule}
                  className="mt-3 w-full py-3 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 font-semibold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
                >
                  <FaPlus /> Add Another Module
                </button>
              </div>

              {/* Pricing */}
              <div className="pt-6 border-t-2 border-gray-100">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
                  <FaDollarSign className="text-indigo-500" />
                  Pricing
                </label>
                
                <label className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl cursor-pointer mb-4 border-2 border-transparent hover:border-indigo-200 transition-all">
                  <input
                    type="checkbox"
                    name="isFree"
                    checked={formData.isFree}
                    onChange={handleChange}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="font-semibold text-gray-700">This is a free course</span>
                </label>

                {!formData.isFree && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        placeholder="99.00"
                        required={!formData.isFree}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Payment ($)
                      </label>
                      <input
                        type="number"
                        name="monthlyAmount"
                        value={formData.monthlyAmount}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        placeholder="25.00"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-gray-50 px-8 py-6 flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/instructor/my-courses")}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-white hover:border-gray-400 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || uploadingImage}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Creating...
                  </span>
                ) : "Create Course"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateInstructorCourse;
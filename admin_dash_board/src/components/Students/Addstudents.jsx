import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudents = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    profileImage: null,
    courseEnrolled: "",
    address: "",
  });

  const preset_key = "arsmfwi7"; // same Cloudinary preset
  const cloud_name = "dnqlt6cit"; // your Cloudinary cloud name

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    if (files && files.length > 0) {
      setInputs({ ...inputs, [name]: files[0] });
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let img_url = null;
      if (inputs.profileImage) {
        const formData = new FormData();
        formData.append("file", inputs.profileImage);
        formData.append("upload_preset", preset_key);

        let imageRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );

        img_url = imageRes.data.secure_url;
      }

      let payloads = {
        ...inputs,
        profileImage: img_url,
      };

      let res = await axios.post("http://localhost:8080/add_student", payloads);
      //console.log(res.data);

      alert("Student added successfully!");
      navigate("/view_students");

      setInputs({
        name: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        profileImage: null,
        courseEnrolled: "",
        address: "",
      });
    } catch (error) {
      //console.error(error);
      alert("Error adding student");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Student</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={inputs.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={inputs.phone}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={inputs.age}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <select
          name="gender"
          value={inputs.gender}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <input
          type="text"
          name="courseEnrolled"
          placeholder="Course Enrolled"
          value={inputs.courseEnrolled}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <textarea
          name="address"
          placeholder="Address"
          value={inputs.address}
          onChange={handleChange}
          rows="3"
          className="w-full border border-gray-300 rounded px-3 py-2"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudents;

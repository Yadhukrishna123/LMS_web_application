import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddInstructors = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    image: null,
    specialization: "",
    experience: "",
    qualification: "",
    linkedin: "",
    github: "",
    website: "",
  });

  const preset_key = "arsmfwi7";
  const cloud_name = "dnqlt6cit";

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
      if (inputs.image) {
        const formData = new FormData();
        formData.append("file", inputs.image);
        formData.append("upload_preset", preset_key);

        let imageRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );

        img_url = imageRes.data.secure_url;
      }

      let payloads = {
        ...inputs,
        image: img_url, 
      };

      let res = await axios.post(
        "http://localhost:8080/add_instructor",
        payloads
      );
      console.log(res.data);

      alert("Instructor added successfully...!");
      navigate("/view_Instuctors");
      setInputs({
        name: "",
        email: "",
        phone: "",
        bio: "",
        image: null,
        specialization: "",
        experience: "",
        qualification: "",
        linkedin: "",
        github: "",
        website: "",
      });
    } catch (error) {
      console.error(error);
      alert(" Error adding instructor");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Instructor</h2>

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
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <textarea
          name="bio"
          placeholder="Short Bio"
          value={inputs.bio}
          onChange={handleChange}
          rows="3"
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        ></textarea>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <input
          type="text"
          name="specialization"
          placeholder="Specialization (e.g. AI, Web Dev)"
          value={inputs.specialization}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <input
          type="number"
          name="experience"
          placeholder="Experience (years)"
          value={inputs.experience}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <input
          type="text"
          name="qualification"
          placeholder="Qualification (e.g. MSc, PhD)"
          value={inputs.qualification}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={inputs.linkedin}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <input
          type="text"
          name="github"
          placeholder="GitHub URL"
          value={inputs.github}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <input
          type="text"
          name="website"
          placeholder="Personal Website"
          value={inputs.website}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          Add Instructor
        </button>
      </form>
    </div>
  );
};

export default AddInstructors;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudents = () => {
  const navigate = useNavigate();
  const [batches, setBatches] = useState([]);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    profileImage: null,
    courseEnrolled: "",
    address: "",
    batch: "", // default to empty string
  });

  const preset_key = "arsmfwi7"; // Cloudinary
  const cloud_name = "dnqlt6cit";

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/view_all_batches")
      .then((res) => setBatches(res.data.data || []))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    if (files && files.length > 0) setInputs({ ...inputs, [name]: files[0] });
    else setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let img_url = null;
      if (inputs.profileImage) {
        const formData = new FormData();
        formData.append("file", inputs.profileImage);
        formData.append("upload_preset", preset_key);
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );
        img_url = res.data.secure_url;
      }

      await axios.post("http://localhost:8080/api/v1/add_student", {
        ...inputs,
        profileImage: img_url,
      });

      alert("Student added successfully!");
      navigate("/view_students");
    } catch (error) {
      console.error(error);
      alert("Error adding student");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Add Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={inputs.email}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={inputs.phone}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={inputs.age}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="gender"
          value={inputs.gender}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
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
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="courseEnrolled"
          placeholder="Course Enrolled"
          value={inputs.courseEnrolled}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="address"
          placeholder="Address"
          value={inputs.address}
          onChange={handleChange}
          rows="3"
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="batch"
          value={inputs.batch}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Batch</option>
          {batches.map((b) => (
            <option key={b._id} value={b._id}>
              {b.batchName}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudents;

import React, { useState, useEffect } from "react";
import axios from "axios";

const ScheduleBatch = () => {
  const [form, setForm] = useState({
    batchName: "",
    batchCode: "",
    course: "",
    instructor: "",
    mode: "Online",
    maxSeats: 50,
    status: "Upcoming",
    startDate: "",
    endDate: "",
    duration: "",
    daysOfWeek: [],
    classStart: "",
    classEnd: "",
    timeZone: "IST",
    venue: "",
    address: "",
    mapsLink: "",
    description: "",
    notes: "",
    banner: null,
  });


  const preset_key = "arsmfwi7";
  const cloud_name = "dnqlt6cit";


  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const durations = ["1 Month", "2 Months", "3 Months", "6 Months"];

  // Fetch Courses
  const getAllCourses = async () => {
    try {
      let res = await axios.get("http://localhost:8080/api/v1/get_all_courses")
      setCourses(res.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Fetch Instructors
  const getAllInstructors = async () => {
    try {
      let res = await axios.get("http://localhost:8080/api/v1/view_instructor");
      setInstructors(res.data.data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  useEffect(() => {
    getAllCourses();
    getAllInstructors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDaysChange = (day) => {
    setForm((prev) => {
      const exists = prev.daysOfWeek.includes(day);
      return {
        ...prev,
        daysOfWeek: exists
          ? prev.daysOfWeek.filter((d) => d !== day)
          : [...prev.daysOfWeek, day],
      };
    });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, banner: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let uploadedBanner = "";

    if (form.banner) {
      const formData = new FormData();
      formData.append("file", form.banner);
      formData.append("upload_preset", preset_key);

      const imgRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData,
        { timeout: 60000 }
      );

      uploadedBanner = imgRes.data.secure_url;
    }

    const payload = {
      ...form,
      banner: uploadedBanner, 
      daysOfWeek: form.daysOfWeek, 
    };

    console.log("Payload before POST:", payload);

    const res = await axios.post("http://localhost:8080/api/v1/create_batch", payload);
    console.log("Saved Batch:", res.data);
  } catch (err) {
    console.error("Error saving batch", err);
  }
};
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-6">
      <h2 className="text-2xl font-bold text-center"> Schedule New Batch</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <input
          type="text"
          name="batchName"
          placeholder="Batch Name"
          value={form.batchName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        />

        <input
          type="text"
          name="batchCode"
          placeholder="Batch Code"
          value={form.batchCode}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        />

        <select
          name="course"
          value={form.course}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>

        <select
          name="instructor"
          value={form.instructor}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option value="">Select Instructor</option>
          {instructors.map((inst) => (
            <option key={inst._id} value={inst._id}>
              {inst.name}
            </option>
          ))}
        </select>

        <select
          name="mode"
          value={form.mode}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option>Online</option>
          <option>Offline</option>
          <option>Hybrid</option>
        </select>

        <input
          type="number"
          name="maxSeats"
          placeholder="Maximum Seats"
          value={form.maxSeats}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option>Upcoming</option>
          <option>Active</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

         <select
          name="duration"
          value={form.duration}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Duration</option>
          {durations.map((d, i) => (
            <option key={i} value={d}>
              {d}
            </option>
          ))}
        </select>

        <div className="flex flex-wrap gap-3">
          {days.map((day) => (
            <label key={day} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.daysOfWeek.includes(day)}
                onChange={() => handleDaysChange(day)}
              />
              {day}
            </label>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="time"
            name="classStart"
            value={form.classStart}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />
          <input
            type="time"
            name="classEnd"
            value={form.classEnd}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        <select
          name="timeZone"
          value={form.timeZone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option value="IST">IST (India)</option>
          <option value="UTC">UTC</option>
          <option value="EST">EST</option>
          <option value="PST">PST</option>
        </select>

        {(form.mode === "Offline" || form.mode === "Hybrid") && (
          <div className="space-y-3">
            <input
              type="text"
              name="venue"
              placeholder="Venue / Classroom Name"
              value={form.venue}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
            />
            <textarea
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg h-20"
            />
            <input
              type="text"
              name="mapsLink"
              placeholder="Google Maps Link"
              value={form.mapsLink}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>
        )}

        <textarea
          name="description"
          placeholder="Batch Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg h-24"
        />

        <textarea
          name="notes"
          placeholder="Notes for Instructor (private)"
          value={form.notes}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg h-20"
        />

        <input
          type="file"
          name="banner"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border px-3 py-2 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Create Batch
        </button>
      </form>
    </div>
  );
};

export default ScheduleBatch;

import React, { useEffect, useState } from "react";
import axios from "axios";

const BasicInfoForm = ({ data, updateData }) => {
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const durations = ["6 months", "1 year", "3 years"];

  // Fetch categories & instructors on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await axios.get("http://localhost:8080/api/v1/view_All_categories")
        setCategories(catRes.data.data);

        const instRes = await axios.get("http://localhost:8080/api/v1/view_instructor");
        setInstructors(instRes.data.data);
      } catch (err) {
        console.error("Error fetching dropdown data", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      updateData(name, checked);
    } else if (type === "file") {
      updateData(name, files[0]);
    } else if (name === "tags") {
      // Convert comma separated into array
      updateData(
        name,
        value
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      );
    } else {
      updateData(name, value);
    }
  };

  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">A. Basic Info</h3>
      <div className="space-y-3">
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={data.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Short Description"
          value={data.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        ></textarea>

        <textarea
          name="overview"
          placeholder="Detailed Overview"
          value={data.overview}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        ></textarea>

        {/* Price & Free toggle */}
        <div className="flex items-center gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={data.isFree ? "" : data.price}
            onChange={handleChange}
            disabled={data.isFree}
            className="border p-2 rounded flex-grow"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFree"
              checked={data.isFree}
              onChange={handleChange}
            />
            Free Course
          </label>
        </div>

        {/* Duration */}
        <select
          name="duration"
          value={data.duration}
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

        {/* Level */}
        <input
          type="text"
          name="level"
          placeholder="Level (Beginner, Intermediate, Advanced)"
          value={data.level}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Category dropdown */}
        <select
          name="category"
          value={data.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>

        {/* Tags */}
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={Array.isArray(data.tags) ? data.tags.join(", ") : ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Image upload */}
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
    </section>
  );
};

export default BasicInfoForm;

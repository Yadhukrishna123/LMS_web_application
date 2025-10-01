import React, { useEffect, useState } from "react";
import axios from "axios";

const InstructorForm = ({ data, updateData }) => {
  const [instructors, setInstructors] = useState([]);

  // Fetch instructors from backend
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await axios.get("http://localhost:8080/view_instructor");
        setInstructors(res.data.data); // Assuming API returns { success: true, data: [...] }
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };
    fetchInstructors();
  }, []);

  const handleSelectInstructor = (e) => {
    const selectedId = e.target.value;
    const selectedInstructor = instructors.find((inst) => inst._id === selectedId);
    if (selectedInstructor) {
      updateData("instructorDetails", selectedInstructor);
    }
  };

  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">C. Instructor Details</h3>
      <div className="space-y-3">
        {/* Dropdown instead of manual inputs */}
        <select
          value={data.instructorDetails?._id || ""}
          onChange={handleSelectInstructor}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Instructor</option>
          {instructors.map((inst) => (
            <option key={inst._id} value={inst._id}>
              {inst.name}
            </option>
          ))}
        </select>

        {/* Preview selected instructor */}
        {data.instructorDetails?.name && (
          <div className="mt-3 p-3 border rounded bg-gray-50">
            <p><strong>Name:</strong> {data.instructorDetails.name}</p>
            <p><strong>Bio:</strong> {data.instructorDetails.bio}</p>
            <p><strong>Specialization:</strong> {data.instructorDetails.specialization}</p>
            <p><strong>Experience:</strong> {data.instructorDetails.experience}</p>
            <p><strong>Qualification:</strong> {data.instructorDetails.qualification}</p>
            <p><strong>LinkedIn:</strong> {data.instructorDetails.linkedin}</p>
            <p><strong>GitHub:</strong> {data.instructorDetails.github}</p>
            <p><strong>Facebook:</strong> {data.instructorDetails.facebook}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default InstructorForm;

import React, { useEffect, useState } from "react";
import axios from "axios";

const ActiveBatches = () => {
  const [batches, setBatches] = useState([]);

  // Fetch batches
  const getBatches = async () => {
    try {
      const res = await axios.get("http://localhost:8080/view_batches");
      setBatches(res.data.data);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  useEffect(() => {
    getBatches();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6"> All Batches</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 border rounded-lg shadow-md">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Batch Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Instructor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Mode
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Seats
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {batches && batches.length > 0 ? (
              batches.map((batch, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {/* Batch Name */}
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {batch.batchName}
                  </td>

                  {/* Code */}
                  <td className="px-6 py-4 text-gray-600">{batch.batchCode}</td>

                  {/* Course */}
                  <td className="px-6 py-4 text-gray-600">
                    {batch.course?.title || "N/A"}
                  </td>

                  {/* Instructor */}
                  <td className="px-6 py-4 text-gray-600">
                    {batch.instructor?.name || "N/A"}
                  </td>

                  {/* Mode */}
                  <td className="px-6 py-4 text-gray-600">{batch.mode}</td>

                  {/* Seats */}
                  <td className="px-6 py-4 text-gray-600">{batch.maxSeats}</td>

                  {/* Status */}
                  <td className="px-6 py-4 text-gray-600">{batch.status}</td>

                  {/* Dates */}
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(batch.startDate).toLocaleDateString()} -{" "}
                    {new Date(batch.endDate).toLocaleDateString()}
                  </td>

                  {/* Description */}
                  <td className="px-6 py-4 text-gray-600">
                    {batch.description?.slice(0, 40)}...
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-center flex gap-2 justify-center">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow">
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No batches available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveBatches;

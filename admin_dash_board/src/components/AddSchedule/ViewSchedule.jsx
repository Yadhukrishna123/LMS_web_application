import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { FaBookOpen, FaCalendar, FaClock, FaUsers } from 'react-icons/fa';
import SchedulePopup from './SchedulePopup';
import { AdminContext } from '../AdminContext/Context';

const ViewSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handleShowPopup, showPopup } = useContext(AdminContext)

  const getAllSchedule = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/v1/get_all_schedule");

      setSchedules(res.data.schedules || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching schedules:", err);
      setLoading(false);
    }
  };
  console.log(schedules);

  useEffect(() => {
    getAllSchedule();
    console.log(schedules);

  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8" >
      {showPopup && <SchedulePopup />
      }
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Schedule Management</h1>
          <p className="text-gray-600">View and manage all class schedules</p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Sessions</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">5</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaCalendar className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Instructors</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">5</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FaUsers className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Batches</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">2</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <FaBookOpen className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>


        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading schedules...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" >
            {schedules.map((schedule, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-blue-600"
                onClick={() => handleShowPopup(true, schedule._id)}
              >

                <h3 className="text-lg font-semibold text-white mb-2">
                  {schedule.course}
                </h3>
                <p className="text-sm text-white">
                  {schedule.batch}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSchedule;
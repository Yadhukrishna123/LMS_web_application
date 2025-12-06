import React, { useState, useEffect } from 'react';
import { BsBellFill } from 'react-icons/bs';
import { MdClose, MdAssignment, MdAnnouncement, MdGrade, MdInfo } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { FaExclamationCircle } from 'react-icons/fa';

import axios from 'axios';
import { useContext } from 'react';
import { AllCourseDetail } from '../AllCourseContext/Context';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usercourse, setUserCourse] = useState([])
  const { user } = useContext(AllCourseDetail)




  const getAllNoticication = async () => {
    try {
      setLoading(true)
      let res = await axios.get("http://localhost:8080/api/v1/all_notification")
      console.log(res)
      let assignmentNot = res.data.notification.filter((n) => n.type === "assignment")
      console.log("currentUserNotification", assignmentNot)
    let currentusernoti = assignmentNot?.filter((a)=>a.userId === user?._id)
      console.log("currentUserNotification", currentusernoti)
      setNotifications(currentusernoti)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)

    }
  }

  useEffect(() => {
   if (user?._id) {
    getAllNoticication()
  }
  }, [user])
console.log(notifications)



  // const unreadCount = notifications.filter(n => !n.read).length;

  // const markAsRead = async (id) => {
  //   try {
  //     await axios.patch(`http://localhost:8080/api/v1/notifications/${id}/read`, null, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  //   const confirmDelete = (id) => {
  //   setSelectedId(id);
  //   setShowModal(true); //  open modal
  // };

  // const deleteNotification = async () => {
  //   try {
  //     await axios.delete(`http://localhost:8080/api/v1/notifications/${selectedId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //       withCredentials: true,
  //     });
  //     setNotifications(notifications.filter(n => n.id !== selectedId));
  //     setShowModal(false);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const markAllAsRead = async () => {
  //   try {
  //     // Optional: send batch read request to backend
  //     await Promise.all(notifications.filter(n => !n.read).map(n =>
  //       axios.patch(`http://localhost:8080/api/v1/notifications/${n.id}/read`, null, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //     ));
  //     setNotifications(notifications.map(n => ({ ...n, read: true })));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'assignment':
        return 'bg-gradient-to-r from-blue-50 to-blue-100/50';
      case 'announcement':
        return 'bg-gradient-to-r from-purple-50 to-purple-100/50';
      case 'grade':
        return 'bg-gradient-to-r from-green-50 to-green-100/50';
      default:
        return 'bg-gradient-to-r from-gray-50 to-gray-100/50';
    }
  };

  const getIcon = (type) => {
    const iconClass = "w-6 h-6";
    switch (type) {
      case 'assignment':
        return <MdAssignment className={`${iconClass} text-blue-600`} />;
      case 'announcement':
        return <MdAnnouncement className={`${iconClass} text-purple-600`} />;
      case 'grade':
        return <MdGrade className={`${iconClass} text-green-600`} />;
      default:
        return <MdInfo className={`${iconClass} text-gray-600`} />;
    }
  };

    const toggleRead = async (id) => {
    try {
      const notif = notifications.find(n => n._id === id);
      // Replace with your API call
      // await fetch(`/api/notifications/${id}`, {
      //   method: 'PUT',
      //   body: JSON.stringify({ isRead: !notif.isRead })
      // });
      
      setNotifications(notifications.map(n => {
        n._id === id ? { ...n, isRead: !n.isRead } : n
        // console.log(n._id === id ? { ...n, isRead: !n.isRead } : n)
      }
              
      ));
    } catch (error) {
      console.error('Error toggling read status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        {/* <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <BsBellFill className="w-8 h-8 text-indigo-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
              <p className="text-gray-500 text-sm">Stay updated with your alerts</p>
            </div>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
            >
              Mark all as read
            </button>
          )}
        </div> */}

        {/* Notifications List */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <BsBellFill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No notifications</h3>
              <p className="text-gray-400">You're all caught up!</p>
            </div>
          ) : (
            notifications && notifications.map((notif) => (
              <div
                key={notif._id}
                className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 ${!notif.isRead ? 'ring-2 ring-indigo-200' : ''}`}
              >
                <div className={`p-6 rounded-xl ${getNotificationStyle(notif.type)}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">{getIcon(notif.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3
                          className="text-lg font-bold text-gray-800 cursor-pointer hover:text-indigo-600 transition-colors"
                          onClick={() => toggleRead(notif._id)}
                        >
                          {notif.title}
                          {!notif.isRead && <span className="ml-2 inline-block w-2 h-2 bg-indigo-600 rounded-full"></span>}
                        </h3>
                        <button
                          onClick={() => confirmDelete(notif._id)}
                          className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                        >
                          <FaTrash className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-gray-700 mb-3">{notif.message}</p>
                      {notif.data && notif.data.courseName && (
                        <div className="inline-block px-3 py-1 bg-white/60 rounded-full text-sm text-gray-600 mb-2">
                          📚 {notif.data.courseName}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        {/* <span className="text-gray-400 text-sm">{formatTimestamp(notif.createdAt)}</span> */}
                        {!notif.isRead && (
                          <button
                            onClick={() => toggleRead(notif._id)}
                            className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50 p-4"
        // onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-sm w-full text-center border border-gray-200/50"
          // onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-red-50/80 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-red-100">
              <FaExclamationCircle className="w-8 h-8 text-red-500" />
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Delete Notification?
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this notification? This action cannot be undone.
            </p>

            <div className="flex justify-center gap-3">
              <button
                // onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-lg bg-white/80 backdrop-blur-sm text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
              >
                Cancel
              </button>

              <button
                // onClick={deleteNotification}
                className="px-5 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all shadow-sm hover:shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
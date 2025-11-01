import React, { useState, useEffect } from 'react';
import { BsBellFill } from 'react-icons/bs';
import { FaClock, FaDollarSign, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import axios from 'axios';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
    const [showModal, setShowModal] = useState(false); //  for modal
  const [selectedId, setSelectedId] = useState(null); //  store notification ID to delete
  const token = localStorage.getItem('token'); //  make sure token is defined

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/v1/usernotifications', {
          withCredentials: true,
        });
        

        if (res.data.success) {
          setNotifications(res.data.notifications);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotifications();
  }, [token]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:8080/api/v1/notifications/${id}/read`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

    const confirmDelete = (id) => {
    setSelectedId(id);
    setShowModal(true); //  open modal
  };
  
  const deleteNotification = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/notifications/${selectedId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setNotifications(notifications.filter(n => n.id !== selectedId));
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      // Optional: send batch read request to backend
      await Promise.all(notifications.filter(n => !n.read).map(n =>
        axios.patch(`http://localhost:8080/api/v1/notifications/${n.id}/read`, null, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ));
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'urgent': return 'border-l-4 border-red-500 bg-red-50';
      case 'warning': return 'border-l-4 border-amber-500 bg-amber-50';
      case 'info': return 'border-l-4 border-blue-500 bg-blue-50';
      case 'success': return 'border-l-4 border-green-500 bg-green-50';
      default: return 'border-l-4 border-gray-500 bg-gray-50';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'urgent': return <FaExclamationCircle className="w-6 h-6 text-red-500" />;
      case 'warning': return <FaClock className="w-6 h-6 text-amber-500" />;
      case 'info': return <FaDollarSign className="w-6 h-6 text-blue-500" />;
      case 'success': return <FaCheckCircle className="w-6 h-6 text-green-500" />;
      default: return <BsBellFill className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex items-center justify-between">
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
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <BsBellFill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No notifications</h3>
              <p className="text-gray-400">You're all caught up!</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 ${!notif.read ? 'ring-2 ring-indigo-200' : ''}`}
              >
                <div className={`p-6 rounded-xl ${getNotificationStyle(notif.type)}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">{getIcon(notif.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-lg font-bold text-gray-800">
                          {notif.title}
                          {!notif.read && <span className="ml-2 inline-block w-2 h-2 bg-indigo-600 rounded-full"></span>}
                        </h3>
                         <button
                          onClick={() => confirmDelete(notif.id)} // ✅ trigger modal
                          className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                        >
                          <MdClose className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-gray-700 mb-3">{notif.message}</p>
                      <span className="text-gray-400 text-sm">{notif.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Enhanced Glassmorphism Modal - Replace your existing modal code with this */}
{/* Subtle Glassmorphism Modal - Replace your existing modal code with this */}
{showModal && (
  <div 
    className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50 p-4"
    onClick={() => setShowModal(false)}
  >
    <div 
      className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-sm w-full text-center border border-gray-200/50"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Icon container */}
      <div className="bg-red-50/80 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-red-100">
        <FaExclamationCircle className="w-8 h-8 text-red-500" />
      </div>
      
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Delete Notification?
      </h2>
      
      {/* Description */}
      <p className="text-gray-600 mb-6">
        Are you sure you want to delete this notification? This action cannot be undone.
      </p>
      
      {/* Buttons */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-5 py-2.5 rounded-lg bg-white/80 backdrop-blur-sm text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
        >
          Cancel
        </button>
        
        <button
          onClick={deleteNotification}
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

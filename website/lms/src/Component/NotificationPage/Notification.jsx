import React, { useState, useEffect } from 'react';
import { BsBellFill, BsCheck2All } from 'react-icons/bs';
import { FaClock, FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaBell } from 'react-icons/fa';
import { HiOutlineTrash, HiOutlineMailOpen } from 'react-icons/hi';
import { IoNotificationsOutline } from 'react-icons/io5';
import axios from 'axios';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Create axios instance with default config
  const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    withCredentials: true, // This sends cookies automatically
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await api.get('/usernotifications');
      
      if (res.data.success) {
        setNotifications(res.data.notifications);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.response?.status === 401 ? 'Please login to view notifications' : 'Failed to load notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'unread') return !n.read;
    if (activeTab === 'read') return n.read;
    return true;
  });

  // ✅ Fixed: Using withCredentials instead of Bearer token
  const markAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(prev => 
        prev.map(n => n._id === id || n.id === id ? { ...n, read: true } : n)
      );
    } catch (err) {
      console.error('Mark as read error:', err);
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
      }
    }
  };

  const confirmDelete = (id, e) => {
    e?.stopPropagation();
    setSelectedId(id);
    setShowModal(true);
  };

  // ✅ Fixed: Using withCredentials
  const deleteNotification = async () => {
    try {
      await api.delete(`/notifications/${selectedId}`);
      setNotifications(prev => 
        prev.filter(n => n._id !== selectedId && n.id !== selectedId)
      );
      setShowModal(false);
      setSelectedId(null);
    } catch (err) {
      console.error('Delete error:', err);
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
      }
    }
  };

  // ✅ Fixed: Using withCredentials
  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      
      await Promise.all(
        unreadNotifications.map(n => 
          api.patch(`/notifications/${n._id || n.id}/read`)
        )
      );
      
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error('Mark all read error:', err);
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
      }
    }
  };

  const getTypeStyles = (type) => {
    const styles = {
      urgent: {
        bg: 'bg-rose-50',
        iconBg: 'bg-rose-100',
        iconColor: 'text-rose-600',
        badge: 'bg-rose-100 text-rose-700',
        icon: FaExclamationTriangle
      },
      warning: {
        bg: 'bg-amber-50',
        iconBg: 'bg-amber-100',
        iconColor: 'text-amber-600',
        badge: 'bg-amber-100 text-amber-700',
        icon: FaClock
      },
      info: {
        bg: 'bg-sky-50',
        iconBg: 'bg-sky-100',
        iconColor: 'text-sky-600',
        badge: 'bg-sky-100 text-sky-700',
        icon: FaInfoCircle
      },
      success: {
        bg: 'bg-emerald-50',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        badge: 'bg-emerald-100 text-emerald-700',
        icon: FaCheckCircle
      }
    };
    return styles[type] || {
      bg: 'bg-gray-50',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600',
      badge: 'bg-gray-100 text-gray-700',
      icon: FaBell
    };
  };

  const getNotificationId = (notif) => notif._id || notif.id;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <BsBellFill className="w-5 h-5 text-white" />
                </div>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
                <p className="text-sm text-gray-500">{notifications.length} total</p>
              </div>
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-medium text-sm"
              >
                <BsCheck2All className="w-5 h-5" />
                <span className="hidden sm:inline">Mark all read</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 flex items-center justify-between">
            <span>{error}</span>
            <button 
              onClick={() => setError(null)}
              className="text-rose-500 hover:text-rose-700"
            >
              ✕
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-6">
          {[
            { id: 'all', label: 'All', count: notifications.length },
            { id: 'unread', label: 'Unread', count: unreadCount },
            { id: 'read', label: 'Read', count: notifications.length - unreadCount }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Notifications List */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl p-5 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IoNotificationsOutline className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No notifications</h3>
            <p className="text-gray-500">
              {activeTab === 'unread' ? "You've read everything!" : "Nothing to show here"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notif) => {
              const typeStyle = getTypeStyles(notif.type);
              const IconComponent = typeStyle.icon;
              const notifId = getNotificationId(notif);
              
              return (
                <div
                  key={notifId}
                  onClick={() => !notif.read && markAsRead(notifId)}
                  className={`group relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden ${
                    !notif.read ? 'ring-1 ring-indigo-100' : ''
                  }`}
                >
                  {/* Unread indicator */}
                  {!notif.read && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600" />
                  )}
                  
                  <div className="p-5">
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 ${typeStyle.iconBg} rounded-xl flex items-center justify-center`}>
                        <IconComponent className={`w-5 h-5 ${typeStyle.iconColor}`} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-gray-900">
                              {notif.title}
                            </h3>
                            {!notif.read && (
                              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                                New
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!notif.read && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notifId);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Mark as read"
                              >
                                <HiOutlineMailOpen className="w-4 h-4 text-gray-500" />
                              </button>
                            )}
                            <button
                              onClick={(e) => confirmDelete(notifId, e)}
                              className="p-2 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <HiOutlineTrash className="w-4 h-4 text-gray-500 hover:text-rose-600" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                          {notif.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <FaClock className="w-3 h-3" />
                            {notif.timestamp || 'Just now'}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-lg ${typeStyle.badge}`}>
                            {notif.type?.charAt(0).toUpperCase() + notif.type?.slice(1) || 'General'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiOutlineTrash className="w-7 h-7 text-rose-600" />
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
              Delete notification?
            </h2>
            
            <p className="text-gray-500 text-center mb-6">
              This can't be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedId(null);
                }}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={deleteNotification}
                className="flex-1 py-3 px-4 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 transition-colors"
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
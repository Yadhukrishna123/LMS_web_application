import React, { useState } from 'react';
import { Search, Filter, Clock, CheckCircle, XCircle, AlertCircle, Eye, MessageSquare, ChevronDown, Send, User, Calendar, Tag, BarChart3, TrendingUp, Users } from 'lucide-react';

const AdminHelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(null);

  // Sample ticket data with user information
  const tickets = [
    {
      id: 'TKT-001',
      subject: 'Unable to reset password',
      category: 'Account',
      priority: 'high',
      status: 'open',
      createdAt: '2024-10-28',
      lastUpdated: '2024-10-29',
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
      description: 'I am unable to reset my password. The reset link is not working.',
      responses: [
        {
          from: 'Support Team',
          message: 'We are looking into this issue. Please try clearing your browser cache.',
          time: '2024-10-29 10:30 AM',
          isAdmin: true
        }
      ]
    },
    {
      id: 'TKT-002',
      subject: 'Payment not reflecting in account',
      category: 'Payment',
      priority: 'high',
      status: 'in-progress',
      createdAt: '2024-10-27',
      lastUpdated: '2024-10-28',
      userName: 'Jane Smith',
      userEmail: 'jane.smith@example.com',
      description: 'I made a payment of $500 but it is not showing in my account.',
      responses: [
        {
          from: 'Support Team',
          message: 'We have received your payment. It will be reflected within 24 hours.',
          time: '2024-10-28 02:15 PM',
          isAdmin: true
        }
      ]
    },
    {
      id: 'TKT-003',
      subject: 'How to link bank account?',
      category: 'Payment Methods',
      priority: 'medium',
      status: 'resolved',
      createdAt: '2024-10-25',
      lastUpdated: '2024-10-26',
      userName: 'Robert Johnson',
      userEmail: 'robert.j@example.com',
      description: 'I need help linking my bank account to the platform.',
      responses: [
        {
          from: 'Support Team',
          message: 'Please go to Settings > Payment Methods and follow the instructions.',
          time: '2024-10-26 09:00 AM',
          isAdmin: true
        },
        {
          from: 'Robert Johnson',
          message: 'Thank you! It worked.',
          time: '2024-10-26 11:30 AM',
          isAdmin: false
        }
      ]
    },
    {
      id: 'TKT-004',
      subject: 'Security concern about login attempts',
      category: 'Security',
      priority: 'high',
      status: 'open',
      createdAt: '2024-10-29',
      lastUpdated: '2024-10-29',
      userName: 'Sarah Williams',
      userEmail: 'sarah.w@example.com',
      description: 'I noticed multiple login attempts from unknown locations.',
      responses: []
    },
    {
      id: 'TKT-005',
      subject: 'Invoice generation issue',
      category: 'Technical',
      priority: 'low',
      status: 'closed',
      createdAt: '2024-10-20',
      lastUpdated: '2024-10-22',
      userName: 'Michael Brown',
      userEmail: 'michael.b@example.com',
      description: 'Unable to generate invoices for my clients.',
      responses: [
        {
          from: 'Support Team',
          message: 'This has been fixed in the latest update.',
          time: '2024-10-22 03:45 PM',
          isAdmin: true
        }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'resolved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'closed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleStatusChange = (ticketId, newStatus) => {
    console.log(`Changing ticket ${ticketId} status to ${newStatus}`);
    // Handle status change logic
  };

  const handleSendReply = (ticketId) => {
    if (replyMessage.trim()) {
      console.log(`Sending reply to ticket ${ticketId}:`, replyMessage);
      setReplyMessage('');
      setShowReplyBox(null);
      // Handle send reply logic
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.userName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-2">Support Ticket Management</h1>
          <p className="text-emerald-50">Admin dashboard to manage and respond to support tickets</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-800">{tickets.filter(t => t.status === 'open').length}</div>
            <div className="text-sm text-gray-600">Open Tickets</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <BarChart3 className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-gray-800">{tickets.filter(t => t.status === 'in-progress').length}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-gray-800">{tickets.filter(t => t.priority === 'high').length}</div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <BarChart3 className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-3xl font-bold text-gray-800">{tickets.length}</div>
            <div className="text-sm text-gray-600">Total Tickets</div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by ticket ID, subject, or user name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-12 pr-10 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition bg-white appearance-none cursor-pointer"
                style={{ minWidth: '12rem' }}
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Priority Filter */}
            <div className="relative">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="pl-12 pr-10 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition bg-white appearance-none cursor-pointer"
                style={{ minWidth: '11rem' }}
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredTickets.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <MessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No tickets found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Ticket Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <span className="text-sm font-bold text-gray-500">{ticket.id}</span>
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(ticket.status)}`}>
                              {getStatusIcon(ticket.status)}
                              {ticket.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </span>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-800 mb-3">{ticket.subject}</h3>
                          
                          {/* User Info */}
                          <div className="flex items-center gap-2 mb-3 p-3 bg-gray-50 rounded-lg">
                            <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-full">
                              <User className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-800">{ticket.userName}</div>
                              <div className="text-xs text-gray-600">{ticket.userEmail}</div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Tag className="w-4 h-4" />
                              {ticket.category}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Created: {ticket.createdAt}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              {ticket.responses.length} {ticket.responses.length === 1 ? 'Response' : 'Responses'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex lg:flex-col gap-3">
                      <button
                        onClick={() => setSelectedTicket(selectedTicket === ticket.id ? null : ticket.id)}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition shadow-md hover:shadow-lg whitespace-nowrap"
                      >
                        <Eye className="w-5 h-5" />
                        {selectedTicket === ticket.id ? 'Hide' : 'View'}
                      </button>
                      <select
                        value={ticket.status}
                        onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                        className="flex-1 lg:flex-none px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 bg-white font-semibold text-sm cursor-pointer"
                      >
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedTicket === ticket.id && (
                    <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                      {/* Description */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">Description</h4>
                        <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">{ticket.description}</p>
                      </div>

                      {/* Responses */}
                      {ticket.responses.length > 0 && (
                        <div>
                          <h4 className="font-bold text-gray-800 mb-3">Conversation History</h4>
                          <div className="space-y-3">
                            {ticket.responses.map((response, idx) => (
                              <div
                                key={idx}
                                className={`p-4 rounded-lg ${
                                  response.isAdmin
                                    ? 'bg-emerald-50 border-l-4 border-emerald-500'
                                    : 'bg-blue-50 border-l-4 border-blue-500'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-800">{response.from}</span>
                                    {response.isAdmin && (
                                      <span className="px-2 py-1 bg-emerald-600 text-white text-xs rounded-full font-semibold">
                                        Admin
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-xs text-gray-500">{response.time}</span>
                                </div>
                                <p className="text-gray-700">{response.message}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Reply Box */}
                      <div className="mt-6 border-t border-gray-200 pt-6">
                        <h4 className="font-bold text-gray-800 mb-3">Send Response</h4>
                        {showReplyBox === ticket.id ? (
                          <div className="space-y-3">
                            <textarea
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              placeholder="Type your response here..."
                              rows={4}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition resize-none"
                            />
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleSendReply(ticket.id)}
                                className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition shadow-md hover:shadow-lg"
                              >
                                <Send className="w-5 h-5" />
                                Send Reply
                              </button>
                              <button
                                onClick={() => {
                                  setShowReplyBox(null);
                                  setReplyMessage('');
                                }}
                                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowReplyBox(ticket.id)}
                            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition shadow-md hover:shadow-lg"
                          >
                            <MessageSquare className="w-5 h-5" />
                            Reply to Ticket
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHelpSupport;
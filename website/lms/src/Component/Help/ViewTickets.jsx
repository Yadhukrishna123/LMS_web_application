import React, { useState } from 'react';
import { Search, Filter, Clock, CheckCircle, XCircle, AlertCircle, Eye, MessageSquare, ChevronDown } from 'lucide-react';

const ViewTickets = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Sample ticket data
  const tickets = [
    {
      id: 'TKT-001',
      subject: 'Unable to reset password',
      category: 'Account',
      priority: 'high',
      status: 'open',
      createdAt: '2024-10-28',
      lastUpdated: '2024-10-29',
      description: 'I am unable to reset my password. The reset link is not working.',
      responses: [
        {
          from: 'Support Team',
          message: 'We are looking into this issue. Please try clearing your browser cache.',
          time: '2024-10-29 10:30 AM'
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
      description: 'I made a payment of $500 but it is not showing in my account.',
      responses: [
        {
          from: 'Support Team',
          message: 'We have received your payment. It will be reflected within 24 hours.',
          time: '2024-10-28 02:15 PM'
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
      description: 'I need help linking my bank account to the platform.',
      responses: [
        {
          from: 'Support Team',
          message: 'Please go to Settings > Payment Methods and follow the instructions.',
          time: '2024-10-26 09:00 AM'
        },
        {
          from: 'You',
          message: 'Thank you! It worked.',
          time: '2024-10-26 11:30 AM'
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
      description: 'Unable to generate invoices for my clients.',
      responses: [
        {
          from: 'Support Team',
          message: 'This has been fixed in the latest update.',
          time: '2024-10-22 03:45 PM'
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

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Support Tickets</h1>
          <p className="text-emerald-50">Track and manage all your support requests</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tickets by ID or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-12 pr-10 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition bg-white appearance-none cursor-pointer"
                style={{ minWidth: '12rem' }}
              >
                <option value="all">All Tickets</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{tickets.filter(t => t.status === 'open').length}</div>
              <div className="text-sm text-gray-600">Open</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{tickets.filter(t => t.status === 'in-progress').length}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{tickets.filter(t => t.status === 'resolved').length}</div>
              <div className="text-sm text-gray-600">Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{tickets.filter(t => t.status === 'closed').length}</div>
              <div className="text-sm text-gray-600">Closed</div>
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
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Ticket Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="text-sm font-bold text-gray-500">{ticket.id}</span>
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(ticket.status)}`}>
                              {getStatusIcon(ticket.status)}
                              {ticket.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </span>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-800 mb-2">{ticket.subject}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <span className="font-semibold">Category:</span> {ticket.category}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
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

                    {/* View Button */}
                    <button
                      onClick={() => setSelectedTicket(selectedTicket === ticket.id ? null : ticket.id)}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition shadow-md hover:shadow-lg whitespace-nowrap"
                    >
                      <Eye className="w-5 h-5" />
                      {selectedTicket === ticket.id ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {selectedTicket === ticket.id && (
                    <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                      {/* Description */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">Description</h4>
                        <p className="text-gray-600 leading-relaxed">{ticket.description}</p>
                      </div>

                      {/* Responses */}
                      {ticket.responses.length > 0 && (
                        <div>
                          <h4 className="font-bold text-gray-800 mb-3">Conversation</h4>
                          <div className="space-y-3">
                            {ticket.responses.map((response, idx) => (
                              <div
                                key={idx}
                                className={`p-4 rounded-lg ${
                                  response.from === 'You'
                                    ? 'bg-emerald-50 border border-emerald-200'
                                    : 'bg-gray-50 border border-gray-200'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-semibold text-gray-800">{response.from}</span>
                                  <span className="text-xs text-gray-500">{response.time}</span>
                                </div>
                                <p className="text-gray-700">{response.message}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {ticket.responses.length === 0 && (
                        <div className="text-center py-6 bg-gray-50 rounded-lg">
                          <p className="text-gray-600">No responses yet. Our team will respond soon.</p>
                        </div>
                      )}
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

export default ViewTickets;
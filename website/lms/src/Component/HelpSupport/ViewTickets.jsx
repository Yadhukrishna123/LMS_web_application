import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Send, User, MessageSquare } from "lucide-react";

const API_BASE = "http://localhost:8080/api/v1";

const TicketChatPage = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch ticket and messages
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axios.get(`${API_BASE}/ticket/${ticketId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        });
        setTicket(res.data.data);
        setMessages(res.data.data.messages || []);

      } catch (err) {
        console.error("Error fetching ticket:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [ticketId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const res = await axios.post(`${API_BASE}/ticket/${ticketId}/message`, { message: newMessage }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      withCredentials: true,
    });
      setMessages((prev) => [...prev, res.data.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-emerald-600"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <MessageSquare className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-gray-700 text-lg">Ticket not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-emerald-600 text-white py-4 px-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Ticket Chat</h2>
          <p className="text-sm text-emerald-100">
            {ticket.subject || "Support Ticket"}
          </p>
        </div>
        <Link
          to="/admin/help-support"
          className="flex items-center gap-2 bg-white text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-50 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
      </div>

      {/* Ticket Info */}
      <div className="bg-white shadow-md rounded-xl p-6 m-6">
        <div className="flex flex-wrap gap-6 text-gray-700">
          <p><strong>Status:</strong> {ticket.status}</p>
          <p><strong>Category:</strong> {ticket.category || "General"}</p>
          <p><strong>Priority:</strong> {ticket.priority}</p>
          <p><strong>Date:</strong> {new Date(ticket.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 bg-white shadow-md rounded-xl mx-6 mb-6 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No messages yet. Start the conversation below 👇
            </div>
          ) : (
            messages.map((msg, i) => (
  <div
    key={i}
    className={`flex ${msg.sender?.role === "admin" ? "justify-end" : "justify-start"}`}
  >
    <div
      className={`max-w-xs md:max-w-md p-4 rounded-2xl ${
        msg.sender?.role === "admin"
          ? "bg-emerald-100 text-gray-900"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <User className="w-4 h-4" />
        <span className="font-semibold text-sm">
          {msg.sender?.role === "admin" ? "Admin" : msg.sender?.name || "User"}
        </span>
      </div>
      <p className="text-sm">{msg.message}</p>
      <div className="text-xs text-gray-500 mt-1">
        {new Date(msg.createdAt).toLocaleTimeString()}
      </div>
    </div>
  </div>
))

          )}
        </div>

        {/* Input box */}
        <div className="border-t p-4 bg-gray-50 flex items-center gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full transition"
          >
            <Send className="w-5 h-5" />

          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketChatPage;

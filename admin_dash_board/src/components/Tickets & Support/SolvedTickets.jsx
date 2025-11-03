import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSearch,
  FaEye,
  FaTrash,
  FaFilePdf,
  FaPrint,
  FaCheckCircle,
  FaPlus,
} from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { GhostIcon } from "lucide-react";

const API_BASE = "http://localhost:8080/api/v1";

const TicketsSolved = () => {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const fetchTickets = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/tickets/solved`, {
        params: { page, limit: itemsPerPage, search },
      });
      setTickets(res.data.data || []);
      setCurrentPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };
  const goto = (url) => {
    window.location.href = url;
  }

  useEffect(() => {
    fetchTickets(currentPage);
  }, [search, currentPage]);

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this ticket record?")) return;
    try {
      await axios.delete(`${API_BASE}/tickets/${id}`);
      fetchTickets(currentPage);
    } catch (err) {
      console.error("Error deleting ticket:", err);
    }
  };

  // Export PDF
  const handleExportPDF = () => {
    if (!tickets.length) return alert("No tickets to export.");
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Solved Tickets Report", 14, 15);
    const columns = ["#", "Ticket ID", "Subject", "Assigned To", "Category", "Resolved On"];
    const rows = tickets.map((t, i) => [
      i + 1,
      t.ticketId,
      t.subject,
      t.assignedTo?.name || "N/A",
      t.category,
      new Date(t.resolvedAt).toLocaleDateString(),
    ]);
    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 25,
      headStyles: { fillColor: [59, 130, 246] },
    });
    doc.save("Solved_Tickets.pdf");
  };

  // Print
  const handlePrint = () => {
    const rows = tickets
      .map(
        (t, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${t.ticketId}</td>
          <td>${t.subject}</td>
          <td>${t.assignedTo?.name || "N/A"}</td>
          <td>${t.category}</td>
          <td>${new Date(t.resolvedAt).toLocaleDateString()}</td>
        </tr>`
      )
      .join("");
    const win = window.open("", "_blank");
    win.document.write(`
      <html>
      <head>
        <title>Solved Tickets</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #f5f5f5; }
          h2 { text-align: center; }
        </style>
      </head>
      <body>
        <h2>Solved Tickets Report</h2>
        <table>
          <thead>
            <tr>
              <th>#</th><th>Ticket ID</th><th>Subject</th><th>Assigned To</th><th>Category</th><th>Resolved On</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  // Pagination
  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-3 rounded-xl">
            <FaCheckCircle className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Solved Tickets</h2>
            <p className="text-gray-600">View and manage resolved support tickets</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ticket ID or subject..."
              className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            <button
              onClick={handleExportPDF}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl flex items-center gap-2 hover:from-red-600 hover:to-pink-600 shadow-lg"
            >
              <FaFilePdf /> Export PDF
            </button>
            <button
              onClick={handlePrint}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl flex items-center gap-2 hover:from-blue-600 hover:to-indigo-600 shadow-lg"
            >
              <FaPrint /> Print
            </button>
            <button
              onClick={() => goto('/adminhelpsupport')}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg flex items-center gap-2"
            >
              <FaPlus /> View Tickets
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-4">
            <h3 className="text-xl font-semibold text-white">All Solved Tickets</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["#", "Ticket ID", "Subject", "Assigned To", "Category", "Resolved On", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-500">Loading tickets...</td>
                  </tr>
                ) : tickets.length ? (
                  tickets.map((t, i) => (
                    <tr key={t._id} className="hover:bg-blue-50 transition">
                      <td className="px-6 py-3 text-sm">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                      <td className="px-6 py-3 text-sm font-semibold text-gray-800">{t.ticketId}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{t.subject}</td>
                      <td className="px-6 py-3 text-sm">{t.assignedTo?.name || "Unassigned"}</td>
                      <td className="px-6 py-3 text-sm">{t.category}</td>
                      <td className="px-6 py-3 text-sm">{new Date(t.resolvedAt).toLocaleDateString()}</td>
                      <td className="px-6 py-3 text-center">
                        <div className="flex justify-center gap-3">
                          <button className="text-green-600 hover:bg-green-50 p-2 rounded-lg">
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleDelete(t._id)}
                            className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-10 text-gray-500">
                      No solved tickets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-center bg-gray-50 border-t">
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <button onClick={goPrev} disabled={currentPage === 1} className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50">
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "border text-gray-700 hover:bg-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button onClick={goNext} disabled={currentPage === totalPages} className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketsSolved;

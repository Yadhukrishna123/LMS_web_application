const Ticket = require("../modals/tickets");
const Message = require("../modals/message");
const User = require("../modals/users");

// Generate unique ticket IDs
const generateTicketId = () => {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  return `TKT-${timestamp}-${random}`;
};

exports.createTicket = async (req, res) => {
  try {
    const { subject, category, message, attachment, priority } = req.body; // ✅ include priority

    if (!subject || !category || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newTicket = new Ticket({
      ticketId: generateTicketId(),
      user: req.user._id,
      subject,
      category,
      message,
      attachment,
      priority: priority || "medium", // ✅ use from frontend or default
      status: "open",
    });

    await newTicket.save();

    return res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      data: newTicket, // ✅ rename to 'data' to match frontend
    });
  } catch (error) {
    console.error("Create Ticket Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id })
      // .populate("assignedTo", "name email")  ❌ remove this
      .sort({ createdAt: -1 });

    console.log("Logged in user:", req.user?._id);
    res.json({ success: true, data: tickets });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



/** 🧑‍💻 Admin: Get all open/in-progress tickets */
exports.getAdminTickets = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const query = {
      status: { $in: ["open", "in-progress"] },
      ...(search && {
        $or: [
          { ticketId: { $regex: search, $options: "i" } },
          { subject: { $regex: search, $options: "i" } },
        ],
      }),
    };

    const tickets = await Ticket.find(query)
      .populate("user", "name email")
      .populate("assignedTo", "name")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Ticket.countDocuments(query);

    res.json({
      success: true,
      data: tickets,
      totalPages: Math.ceil(total / limit),
      page: Number(page),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/** 💬 Add message to a ticket (user or admin) */
exports.addMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    if (!message || !id) {
      return res.status(400).json({ success: false, message: "Message and Ticket ID are required" });
    }

    const msg = new Message({
      ticket: id,
      sender: req.user._id,
      message,
    });
    await msg.save();

    await Ticket.findByIdAndUpdate(id, {
      $push: { messages: msg._id },
      status: "in-progress",
    });

    res.json({ success: true, data: msg });
  } catch (err) {
    console.error("Add message error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/** ✅ Admin marks ticket as solved */
exports.markAsSolved = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { status: "solved", resolvedAt: new Date() },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    res.json({ success: true, data: ticket });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/** 🗂️ Admin: Get all solved tickets */
exports.getSolvedTickets = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const query = {
      status: "solved",
      ...(search && {
        $or: [
          { ticketId: { $regex: search, $options: "i" } },
          { subject: { $regex: search, $options: "i" } },
        ],
      }),
    };

    const tickets = await Ticket.find(query)
      .populate("assignedTo", "name")
      .sort({ resolvedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Ticket.countDocuments(query);

    res.json({
      success: true,
      data: tickets,
      totalPages: Math.ceil(total / limit),
      page: Number(page),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/** 🗑️ Delete ticket */
exports.deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Ticket deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

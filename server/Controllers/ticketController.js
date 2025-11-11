const Ticket = require("../modals/tickets");
const Message = require("../modals/message");
const User = require("../modals/users");

// Utility to generate ticket IDs like TKT-1234-ABCDEF
const generateTicketId = () => {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  return `TKT-${timestamp}-${random}`;
};

// --------------------------- CREATE TICKET ---------------------------
exports.createTicket = async (req, res) => {
  try {
    const { subject, category, message, attachment, priority } = req.body;
    if (!subject || !category || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newTicket = new Ticket({
      ticketId: generateTicketId(),
      user: req.user._id,
      subject,
      category,
      message,
      attachment,
      priority: priority || "medium",
      status: "open",
    });

    await newTicket.save();
    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      data: newTicket,
    });
  } catch (error) {
    console.error("Create Ticket Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// --------------------------- USER TICKETS ---------------------------
exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, data: tickets });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// --------------------------- ADMIN TICKETS ---------------------------
exports.getAdminTickets = async (req, res) => {
  try {
    const pageNum = Number(req.query.page) || 1;
    const limitNum = Number(req.query.limit) || 100;
    const search = String(req.query.search || "").trim();
    const status = String(req.query.status || "all").toLowerCase();
    const priority = String(req.query.priority || "all").toLowerCase();

    const query = {};

    // Exclude closed by default unless explicitly filtered
    if (status && status !== "all") {
      query.status = status;
    } else {
      query.status = { $ne: "closed" };
    }

    // Optional priority filter (case-insensitive; supports "Urgent")
    if (priority && priority !== "all") {
      query.priority = { $regex: `^${priority}$`, $options: "i" };
    }

    if (search) {
      query.$or = [
        { ticketId: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    const [tickets, total] = await Promise.all([
      Ticket.find(query)
        .populate("user", "name firstname lastname email")
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Ticket.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: tickets,
      totalPages: Math.ceil(total / limitNum),
      page: pageNum,
    });
  } catch (err) {
    console.error("getAdminTickets error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// --------------------------- ADD MESSAGE ---------------------------
exports.addMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, senderId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    // Determine sender (user/admin/institution/system fallback)
    let sender = req.user?._id || senderId || null;

    if (!sender) {
      const systemUser = await User.findOne({ role: "institution" }).select("_id");
      if (systemUser) sender = systemUser._id;
      // If Message.sender is required in your schema:
      // else return res.status(400).json({ success: false, message: "Sender not identified" });
    }

    const msg = await Message.create({
      ticket: id,
      sender,
      message: message.trim(),
    });

    await Ticket.findByIdAndUpdate(id, { $push: { messages: msg._id } });

    return res.status(201).json({
      success: true,
      data: msg,
    });
  } catch (err) {
    console.error("Add message error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// --------------------------- GET TICKET + MESSAGES ---------------------------
exports.getTicketWithMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id).populate("user", "name firstname lastname email");

    if (!ticket)
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });

    const messages = await Message.find({ ticket: id })
      .populate("sender", "name firstname lastname email role")
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      data: { ...ticket.toObject(), messages },
    });
  } catch (err) {
    console.error("getTicketWithMessages error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// --------------------------- MARK AS SOLVED ---------------------------
exports.markAsSolved = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { status: "solved", resolvedAt: new Date() },
      { new: true }
    );

    if (!ticket)
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });

    res.json({ success: true, data: ticket });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// --------------------------- GET SOLVED TICKETS ---------------------------
exports.getSolvedTickets = async (req, res) => {
  try {
    const pageNum = Number(req.query.page) || 1;
    const limitNum = Number(req.query.limit) || 10;
    const search = String(req.query.search || "").trim();

    const query = {
      status: { $in: ["solved", "closed"] },
    };

    if (search) {
      query.$or = [
        { ticketId: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    const [tickets, total] = await Promise.all([
      Ticket.find(query)
        .populate("user", "name email firstname lastname username")
        // Sort by resolvedAt, and fall back to updatedAt/createdAt when missing
        .sort({ resolvedAt: -1, updatedAt: -1, createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .lean(),
      Ticket.countDocuments(query),
    ]);

    // Provide a computed resolvedOn to the client
    const withResolvedOn = tickets.map((t) => ({
      ...t,
      resolvedOn: t.resolvedAt || t.updatedAt || t.createdAt || null,
    }));

    res.json({
      success: true,
      data: withResolvedOn,
      totalPages: Math.ceil(total / limitNum),
      page: pageNum,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// --------------------------- DELETE TICKET ---------------------------
exports.deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    await Message.deleteMany({ ticket: req.params.id });
    res.json({ success: true, message: "Ticket deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// --------------------------- UPDATE STATUS ---------------------------
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const ticket = await Ticket.findById(id);
    if (!ticket) return res.status(404).json({ success: false, message: "Ticket not found" });

    ticket.status = status;

    // Set resolvedAt when moving into solved/closed (don’t overwrite if already set)
    if ((status === "solved" || status === "closed") && !ticket.resolvedAt) {
      ticket.resolvedAt = new Date();
    }
    // If reopening, we keep resolvedAt as historical; remove the next lines if you prefer to clear it:
    // else if (status !== "solved" && status !== "closed") {
    //   ticket.resolvedAt = undefined;
    // }

    await ticket.save();
    res.json({ success: true, data: ticket });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

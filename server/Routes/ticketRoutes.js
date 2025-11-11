const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/jwtAuth");
const ticketCtrl = require("../Controllers/ticketController");

// 🔹 User Routes
router.post("/createticket", authToken, ticketCtrl.createTicket);
router.get("/getusertickets", authToken, ticketCtrl.getUserTickets);
router.post("/userticket/:id/message", authToken, ticketCtrl.addMessage);
router.get("/userticket/:id", ticketCtrl.getTicketWithMessages);

// 🔹 Admin Routes
router.get("/admin", ticketCtrl.getAdminTickets);
router.get("/ticket/:id", ticketCtrl.getTicketWithMessages);
router.post("/ticket/:id/message", ticketCtrl.addMessage);
router.patch("/ticket/:id/status", ticketCtrl.updateStatus);
router.delete("/ticket/:id", ticketCtrl.deleteTicket);
router.get("/solved", ticketCtrl.getSolvedTickets);
router.patch("/ticket/:id/solved", ticketCtrl.markAsSolved);

module.exports = router;
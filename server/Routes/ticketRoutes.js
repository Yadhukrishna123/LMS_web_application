const express = require("express");
const router = express.Router();
const { authToken } = require("../middleware/jwtAuth");
const ticketCtrl = require("../Controllers/ticketController");

// ✅ USER ROUTES (already correct)
router.post("/createticket", authToken, ticketCtrl.createTicket);
router.get("/getusertickets", authToken, ticketCtrl.getUserTickets);
router.post("/userticket/:id/message", authToken, ticketCtrl.addMessage);
router.get("/userticket/:id", authToken, ticketCtrl.getTicketWithMessages);  // ← ADD authToken

// ✅ ADMIN/INSTITUTION ROUTES - ADD authToken TO ALL
router.get("/admin", authToken, ticketCtrl.getAdminTickets);              // ← ADD
router.get("/ticket/:id", authToken, ticketCtrl.getTicketWithMessages);   // ← ADD
router.post("/ticket/:id/message",  ticketCtrl.addMessage);     // ← ADD (CRITICAL)
router.patch("/ticket/:id/status", authToken, ticketCtrl.updateStatus);   // ← ADD
router.delete("/ticket/:id", authToken, ticketCtrl.deleteTicket);         // ← ADD
router.get("/solved", authToken, ticketCtrl.getSolvedTickets);            // ← ADD
router.patch("/ticket/:id/solved", authToken, ticketCtrl.markAsSolved); 

module.exports = router;
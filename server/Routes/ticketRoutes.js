const { authToken } = require("../middleware/jwtAuth");
const ticketCtrl = require("../Controllers/ticketController");
const express = require("express");
const router = express.Router();

// User routes
router.post("/createticket", authToken, ticketCtrl.createTicket);
router.get("/getusertickets", authToken, ticketCtrl.getUserTickets);
router.post("/:id/message", authToken, ticketCtrl.addMessage);

// Admin routes
router.get("/admin", authToken, ticketCtrl.getAdminTickets);
router.patch("/:id/solve", authToken, ticketCtrl.markAsSolved);
router.get("/solved", authToken, ticketCtrl.getSolvedTickets);
router.delete("/:id", authToken, ticketCtrl.deleteTicket);

module.exports = router;

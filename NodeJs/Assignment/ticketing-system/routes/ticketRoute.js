const express = require("express");
const router = express.Router();
const {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  resolveTicket
} = require("../controllers/ticketController");

const dataCheckMiddleware = require("../middlewares/dataCheckMiddleware");

// CRUD Routes
router.get("/", getTickets);
router.get("/:id", getTicketById);
router.post("/", dataCheckMiddleware, createTicket); // middleware here
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);

// Resolve Route
router.patch("/:id/resolve", resolveTicket);

module.exports = router;

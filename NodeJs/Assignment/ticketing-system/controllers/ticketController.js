const { readDB, writeDB } = require("../models/ticketModel");

// GET all tickets
const getTickets = (req, res) => {
  const db = readDB();
  res.json(db.tickets);
};

// GET ticket by ID
const getTicketById = (req, res) => {
  const db = readDB();
  const id = Number(req.params.id);
  const ticket = db.tickets.find(t => t.id === id);

  if (ticket) res.json(ticket);
  else res.status(404).json({ message: "Ticket not found" });
};

// POST create ticket
const createTicket = (req, res) => {
  const db = readDB();
  const newTicket = {
    id: Date.now(),
    ...req.body,
    status: "pending" // default
  };
  db.tickets.push(newTicket);
  writeDB(db);
  res.status(201).json(newTicket);
};

// PUT update ticket
const updateTicket = (req, res) => {
  const db = readDB();
  const id = Number(req.params.id);
  const index = db.tickets.findIndex(t => t.id === id);

  if (index !== -1) {
    db.tickets[index] = { ...db.tickets[index], ...req.body };
    writeDB(db);
    res.json(db.tickets[index]);
  } else {
    res.status(404).json({ message: "Ticket not found" });
  }
};

// DELETE ticket
const deleteTicket = (req, res) => {
  const db = readDB();
  const id = Number(req.params.id);
  const index = db.tickets.findIndex(t => t.id === id);

  if (index !== -1) {
    const deleted = db.tickets.splice(index, 1);
    writeDB(db);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: "Ticket not found" });
  }
};

// PATCH resolve ticket
const resolveTicket = (req, res) => {
  const db = readDB();
  const id = Number(req.params.id);
  const ticket = db.tickets.find(t => t.id === id);

  if (ticket) {
    if (ticket.status === "resolved") {
      return res.json({ message: "Ticket already resolved" });
    }
    ticket.status = "resolved";
    writeDB(db);
    res.json(ticket);
  } else {
    res.status(404).json({ message: "Ticket not found" });
  }
};

module.exports = {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  resolveTicket
};

const Booking = require("../models/Booking");

// Create booking (user)
exports.createBooking = async (req, res) => {
  try {
    const { serviceName, requestedAt, notes } = req.body;
    if (!serviceName || !requestedAt) return res.status(400).json({ message: "Service name and requestedAt required" });

    const booking = await Booking.create({
      user: req.user._id,
      serviceName,
      requestedAt: new Date(requestedAt),
      notes
    });

    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    res.status(500).json({ message: "Create booking failed", error: err.message });
  }
};

// Get bookings (user -> own bookings; admin -> all)
exports.getBookings = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const bookings = await Booking.find().populate("user", "username email role");
      return res.json({ bookings });
    } else {
      const bookings = await Booking.find({ user: req.user._id });
      return res.json({ bookings });
    }
  } catch (err) {
    res.status(500).json({ message: "Get bookings failed", error: err.message });
  }
};

// Update booking (user only updates their own booking if pending)
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // only owner can update
    if (!booking.user.equals(req.user._id)) return res.status(403).json({ message: "Not authorized" });

    // only when pending
    if (booking.status !== "pending") return res.status(400).json({ message: "Only pending bookings can be updated" });

    const { serviceName, requestedAt, notes } = req.body;
    if (serviceName) booking.serviceName = serviceName;
    if (requestedAt) booking.requestedAt = new Date(requestedAt);
    if (notes) booking.notes = notes;

    await booking.save();
    res.json({ message: "Booking updated", booking });
  } catch (err) {
    res.status(500).json({ message: "Update booking failed", error: err.message });
  }
};

// Cancel booking (user cancels own pending)
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (!booking.user.equals(req.user._id)) return res.status(403).json({ message: "Not authorized" });
    if (booking.status !== "pending") return res.status(400).json({ message: "Only pending bookings can be cancelled" });

    booking.status = "cancelled";
    await booking.save();
    res.json({ message: "Booking cancelled", booking });
  } catch (err) {
    res.status(500).json({ message: "Cancel booking failed", error: err.message });
  }
};

// Admin: approve
exports.approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.status !== "pending") return res.status(400).json({ message: "Only pending bookings can be approved" });

    booking.status = "approved";
    await booking.save();
    res.json({ message: "Booking approved", booking });
  } catch (err) {
    res.status(500).json({ message: "Approve failed", error: err.message });
  }
};

// Admin: reject
exports.rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.status !== "pending") return res.status(400).json({ message: "Only pending bookings can be rejected" });

    booking.status = "rejected";
    await booking.save();
    res.json({ message: "Booking rejected", booking });
  } catch (err) {
    res.status(500).json({ message: "Reject failed", error: err.message });
  }
};

// Admin: delete any booking
exports.deleteBookingAdmin = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

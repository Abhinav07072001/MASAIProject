const express = require("express");
const router = express.Router();
const bookingCtrl = require("../controllers/booking.controller");
const authenticate = require("../middleware/auth");
const permit = require("../middleware/role");

// All booking routes require authentication
router.use(authenticate);

// POST /bookings -> create (user)
router.post("/", permit("user", "admin"), bookingCtrl.createBooking);

// GET /bookings -> user own or admin all
router.get("/", permit("user", "admin"), bookingCtrl.getBookings);

// PUT /bookings/:id -> update (user only, pending)
router.put("/:id", permit("user"), bookingCtrl.updateBooking);

// DELETE /bookings/:id -> user cancel (only their own and pending)
router.delete("/:id", permit("user"), bookingCtrl.cancelBooking);

// Admin actions
router.patch("/:id/approve", permit("admin"), bookingCtrl.approveBooking);
router.patch("/:id/reject", permit("admin"), bookingCtrl.rejectBooking);
router.delete("/:id/admin", permit("admin"), bookingCtrl.deleteBookingAdmin);

module.exports = router;

const Doctor = require("../models/doctor.model");
const Consultation = require("../models/consultation.model");

// Create Doctor
exports.createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Soft Delete Doctor + Cascade Consultations
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Mark related consultations inactive
    await Consultation.updateMany({ doctorId: doctor._id }, { isActive: false });

    res.json({ message: "Doctor soft deleted and consultations deactivated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Count Consultations
exports.getConsultationCount = async (req, res) => {
  try {
    const count = await Consultation.countDocuments({
      doctorId: req.params.id,
      isActive: true,
    });
    res.json({ doctorId: req.params.id, consultationCount: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

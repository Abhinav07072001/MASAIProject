const Patient = require("../models/patient.model");
const Consultation = require("../models/consultation.model");

// Create Patient
exports.createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Soft Delete Patient + Cascade Consultations
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!patient) return res.status(404).json({ message: "Patient not found" });

    await Consultation.updateMany({ patientId: patient._id }, { isActive: false });

    res.json({ message: "Patient soft deleted and consultations deactivated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Active Male Patients
exports.getMalePatients = async (req, res) => {
  try {
    const gender = req.query.gender;
    const patients = await Patient.find({ gender, isActive: true });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

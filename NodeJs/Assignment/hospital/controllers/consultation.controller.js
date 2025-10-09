const Consultation = require("../models/consultation.model");
const Doctor = require("../models/doctor.model");
const Patient = require("../models/patient.model");

// Create Consultation
exports.createConsultation = async (req, res) => {
  try {
    const { doctorId, patientId, notes } = req.body;

    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);

    if (!doctor || !patient)
      return res.status(404).json({ message: "Doctor or Patient not found" });

    if (!doctor.isActive || !patient.isActive)
      return res.status(400).json({ message: "Inactive Doctor or Patient" });

    const consultation = await Consultation.create({ doctorId, patientId, notes });
    res.status(201).json(consultation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Doctor → Patients
exports.getPatientsOfDoctor = async (req, res) => {
  try {
    const consultations = await Consultation.find({
      doctorId: req.params.id,
      isActive: true,
    })
      .populate("patientId", "name age gender")
      .sort({ consultedAt: -1 })
      .limit(5);

    res.json(consultations.map((c) => c.patientId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Patient → Doctors
exports.getDoctorsOfPatient = async (req, res) => {
  try {
    const consultations = await Consultation.find({
      patientId: req.params.id,
      isActive: true,
    }).populate("doctorId", "name specialization");

    res.json(consultations.map((c) => c.doctorId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Recent Consultations
exports.getRecentConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find({ isActive: true })
      .sort({ consultedAt: -1 })
      .limit(5)
      .populate("doctorId", "name")
      .populate("patientId", "name");

    res.json(consultations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

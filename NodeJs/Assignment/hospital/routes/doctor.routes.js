const express = require("express");
const { createDoctor, deleteDoctor, getConsultationCount } = require("../controllers/doctor.controller");
const { getPatientsOfDoctor } = require("../controllers/consultation.controller");

const router = express.Router();

router.post("/", createDoctor);
router.delete("/:id", deleteDoctor);
router.get("/:id/consultations/count", getConsultationCount);
router.get("/:id/patients", getPatientsOfDoctor);

module.exports = router;

const express = require("express");
const { createPatient, deletePatient, getMalePatients } = require("../controllers/patient.controller");
const { getDoctorsOfPatient } = require("../controllers/consultation.controller");

const router = express.Router();

router.post("/", createPatient);
router.delete("/:id", deletePatient);
router.get("/", getMalePatients);
router.get("/:id/doctors", getDoctorsOfPatient);

module.exports = router;

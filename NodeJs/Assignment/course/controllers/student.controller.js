const Student = require("../models/student.model");
const Enrollment = require("../models/enrollment.model");

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!student) return res.status(404).json({ message: "Student not found" });

    // Cascade soft delete enrollments
    await Enrollment.updateMany({ studentId: student._id }, { isActive: false });

    res.json({ message: "Student soft deleted and enrollments deactivated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

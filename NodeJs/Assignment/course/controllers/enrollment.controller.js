const Enrollment = require("../models/enrollment.model");
const Student = require("../models/student.model");
const Course = require("../models/course.model");

exports.enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course)
      return res.status(404).json({ message: "Student or Course not found" });

    if (!student.isActive || !course.isActive)
      return res.status(400).json({ message: "Cannot enroll inactive student or course" });

    const enrollment = await Enrollment.create({ studentId, courseId });
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /students/:id/courses
exports.getStudentCourses = async (req, res) => {
  try {
    const courses = await Enrollment.find({
      studentId: req.params.id,
      isActive: true,
    }).populate("courseId");
    res.json(courses.map((e) => e.courseId));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /courses/:id/students
exports.getCourseStudents = async (req, res) => {
  try {
    const students = await Enrollment.find({
      courseId: req.params.id,
      isActive: true,
    }).populate("studentId");
    res.json(students.map((e) => e.studentId));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

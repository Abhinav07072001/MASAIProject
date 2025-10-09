const express = require("express");
const router = express.Router();
const {
  enrollStudent,
  getStudentCourses,
  getCourseStudents,
} = require("../controllers/enrollment.controller");

router.post("/", enrollStudent);
router.get("/students/:id/courses", getStudentCourses);
router.get("/courses/:id/students", getCourseStudents);

module.exports = router;

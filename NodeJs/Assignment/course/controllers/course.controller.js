const Course = require("../models/course.model");
const Enrollment = require("../models/enrollment.model");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!course) return res.status(404).json({ message: "Course not found" });

    await Enrollment.updateMany({ courseId: course._id }, { isActive: false });

    res.json({ message: "Course soft deleted and enrollments deactivated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

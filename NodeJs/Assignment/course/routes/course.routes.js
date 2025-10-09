const express = require("express");
const router = express.Router();
const { createCourse, deleteCourse } = require("../controllers/course.controller");

router.post("/", createCourse);
router.delete("/:id", deleteCourse);

module.exports = router;

const express = require("express");
const CourseController = require("./course.controller");
const { validate } = require("./course.validate");
const { handleValidation } = require("../../services/validate");

const courseRouter = express.Router();

courseRouter.get(
  "/getCourses",
  // validate("getCourses"),
  // handleValidation,
  CourseController.getCourses
);

courseRouter.get(
  "/getEnrolledCourses",
  // validate("getEnrolledCourses"),
  // handleValidation,
  CourseController.getEnrolledCourses
);

courseRouter.get(
  "/getCourseDetail",
  // validate("getCourseDetail"),
  // handleValidation,
  CourseController.getCourseDetail
);

module.exports = courseRouter;
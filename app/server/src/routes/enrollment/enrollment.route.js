const express = require("express");
const EnrollmentController = require("./enrollment.controller");
const { validate } = require("./enrollment.validate");
const { handleValidation } = require("../../services/validate");

const enrollmentRouter = express.Router();

enrollmentRouter.post(
  "/create",
  validate("createEnrollment"),
  handleValidation,
  EnrollmentController.createEnrollment
);

enrollmentRouter.get(
  "/getEnrolledCourses",
  validate("getEnrolledCourses"),
  handleValidation,
  CourseController.getEnrolledCourses
);

module.exports = enrollmentRouter;

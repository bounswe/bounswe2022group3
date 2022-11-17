const express = require("express");
const EnrollmentController = require("./enrollment.controller");
const { validate } = require("./enrollment.validate");
const { handleValidation } = require("../../services/validate");
const { authorization } = require("../../services/auth")

const enrollmentRouter = express.Router();

enrollmentRouter.post(
  "/",
  validate("createEnrollment"),
  handleValidation,
  authorization,
  EnrollmentController.createEnrollment
);

enrollmentRouter.post(
  "/delete",
  validate("deleteEnrollment"),
  handleValidation,
  authorization,
  EnrollmentController.deleteEnrollment
);

enrollmentRouter.get(
  "/getEnrollment:course_id",
  authorization,
  EnrollmentController.getEnrollment
);

enrollmentRouter.get(
  "/getEnrolledCourses:keyword?",
  authorization,
  EnrollmentController.getEnrolledCourses
);

module.exports = enrollmentRouter;

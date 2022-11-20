const express = require("express");
const EnrollmentController = require("./enrollment.controller");
const { validate } = require("./enrollment.validate");
const { handleValidation } = require("../../services/validate");
const { authorization } = require("../../services/auth");

const enrollmentRouter = express.Router();

enrollmentRouter.post(
  "/",
  validate("createEnrollment"),
  handleValidation,
  authorization,
  EnrollmentController.createEnrollment
);

enrollmentRouter.get(
  "/searchEnrollments/:keyword?",
  EnrollmentController.searchEnrollments
);

enrollmentRouter.get(
  "/getEnrolledSpaces",
  authorization,
  EnrollmentController.getEnrolledSpaces
);

module.exports = enrollmentRouter;

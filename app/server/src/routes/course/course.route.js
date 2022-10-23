const express = require("express");
const CourseController = require("./course.controller");
const { validate } = require("./course.validate");
const { handleValidation } = require("../../services/validate");

const courseRouter = express.Router();

courseRouter.post(
  "/createCourse",
  // validate("createCourse"),
  // handleValidation,
  CourseController.createCourse
);

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

courseRouter.post(
  "/createEnrollment",
  // validate("createEnrollment"),
  // handleValidation,
  CourseController.createEnrollment
);

courseRouter.get(
  "/getCourseDetail",
  // validate("getCourseDetail"),
  // handleValidation,
  CourseController.getCourseDetail
);

module.exports = courseRouter;

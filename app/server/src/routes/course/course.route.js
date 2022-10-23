const express = require("express");
const CourseController = require("./course.controller");
const { validate } = require("./course.validate");
const { handleValidation } = require("../../services/validate");

const courseRouter = express.Router();

courseRouter.post(
  "/create",
  validate("createCourse"),
  handleValidation,
  CourseController.createCourse
);

courseRouter.get(
  "/getCourses",
  validate("getCourses"),
  handleValidation,
  CourseController.getCourses
);

courseRouter.get(
  "/:id",
  validate("getCourseDetail"),
  handleValidation,
  CourseController.getCourseDetail
);

module.exports = courseRouter;

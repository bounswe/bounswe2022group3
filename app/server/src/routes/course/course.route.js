const express = require("express");
const CourseController = require("./course.controller");
const { validate } = require("./course.validate");
const { handleValidation } = require("../../services/validate");
const { authorization } = require("../../services/auth");

const courseRouter = express.Router();

courseRouter.post(
  "/",
  validate("createCourse"),
  handleValidation,
  // authorization,
  CourseController.createCourse
);

courseRouter.get(
  "/getCourses/:keyword",
  // validate("getCourses"),
  // handleValidation,
  authorization,
  CourseController.getCourses
);

courseRouter.get(
  "/:id",
  // validate("getCourseDetail"),
  // handleValidation,
  authorization,
  CourseController.getCourseDetail
);

module.exports = courseRouter;

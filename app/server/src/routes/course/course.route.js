const express = require("express");
const CourseController = require("./course.controller");
const { validate } = require("./course.validate");
const { handleValidation } = require("../../services/validate");
const { authorization, authorization_conditional } = require("../../services/auth");

const courseRouter = express.Router();

courseRouter.post(
  "/",
  validate("createCourse"),
  handleValidation,
  authorization,
  CourseController.createCourse
);

courseRouter.get(
  "/getCourses/:keyword?",
  CourseController.getCourses
);

courseRouter.get(
  "/:id",
  authorization_conditional,
  CourseController.getCourseDetail
);

module.exports = courseRouter;

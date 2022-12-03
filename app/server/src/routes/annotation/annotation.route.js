const express = require("express");
const { handleValidation } = require("../../services/validate");
const AnnotationController = require("./annotation.controller");
const { validate } = require("./annotation.validate");
const { authorization } = require("../../services/auth");

const annotationRouter = express.Router();

annotationRouter.post(
  "/",
  validate("create-annotation"),
  handleValidation,
  authorization,
  AnnotationController.createAnnotation
);

annotationRouter.get(
  "/:id",
  validate("get-annotation"),
  handleValidation,
  AnnotationController.getAnnotation
);

module.exports = annotationRouter;

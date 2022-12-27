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

annotationRouter.put(
  "/update/",
  validate("update-annotation"),
  handleValidation,
  authorization,
  AnnotationController.updateAnnotation
);

annotationRouter.get(
  "/getOne/:id",
  validate("get-annotation"),
  handleValidation,
  AnnotationController.getAnnotation
);

annotationRouter.get(
  "/get/:resource_id",
  validate("get-resource-annotations"),
  handleValidation,
  AnnotationController.getResourceAnnotations
);

annotationRouter.delete(
  "/delete/",
  validate("delete-annotation"),
  handleValidation,
  authorization,
  AnnotationController.deleteAnnotation
);

module.exports = annotationRouter;

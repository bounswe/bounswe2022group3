const express = require("express");
const { handleValidation } = require("../../services/validate");
const AnnotationController = require("./annotation.controller");
const { validate } = require("./annotation.validate");

const annotationRouter = express.Router();

annotationRouter.post(
  "/",
  validate("create-annotation"),
  handleValidation,
  AnnotationController.createAnnotation
);

annotationRouter.put(
  "/update/",
  validate("update-annotation"),
  handleValidation,
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
  AnnotationController.deleteAnnotation
);

module.exports = annotationRouter;

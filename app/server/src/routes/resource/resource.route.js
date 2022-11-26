const express = require("express");
const { handleValidation } = require("../../services/validate");
const ResourceController = require("./resource.controller");
const { validate } = require("./resource.validate");
const { authorization } = require("../../services/auth");

const resourceRouter = express.Router();

resourceRouter.post(
  "/",
  validate("create-resource"),
  handleValidation,
  authorization,
  ResourceController.createResource
);

resourceRouter.delete(
  "/delete",
  validate("delete-resource"),
  handleValidation,
  authorization,
  ResourceController.deleteResource
);

resourceRouter.get(
  "/:id",
  ResourceController.getResource
);

resourceRouter.put(
  "/update",
  validate("update-resource"),
  handleValidation,
  authorization,
  ResourceController.updateResource
);

resourceRouter.post(
  "/rate",
  validate("rate-resource"),
  handleValidation,
  authorization,
  ResourceController.rateResource
);

module.exports = resourceRouter;

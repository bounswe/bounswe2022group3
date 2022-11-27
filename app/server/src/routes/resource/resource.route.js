const express = require("express");
const { handleValidation } = require("../../services/validate");
const ResourceController = require("./resource.controller");
const { validate } = require("./resource.validate");

const resourceRouter = express.Router();

resourceRouter.post(
  "/",
  validate("create-resource"),
  handleValidation,
  ResourceController.createResource
);

resourceRouter.get(
  "/:id",
  // validate("call"),
  // handleValidation,
  ResourceController.getResource
);

module.exports = resourceRouter;

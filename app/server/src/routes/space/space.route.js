const express = require("express");
const SpaceController = require("./space.controller");
const { validate } = require("./space.validate");
const { handleValidation } = require("../../services/validate");
const { authorization, authorization_conditional } = require("../../services/auth");

const spaceRouter = express.Router();

spaceRouter.post(
  "/",
  validate("createSpace"),
  handleValidation,
  authorization,
  SpaceController.createSpace
);

spaceRouter.get(
  "/getSpaces/:keyword?",
  SpaceController.getSpaces
);

spaceRouter.get(
  "/:id",
  authorization_conditional,
  SpaceController.getSpaceDetail
);

module.exports = spaceRouter;

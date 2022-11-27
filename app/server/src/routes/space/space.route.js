const express = require("express");
const SpaceController = require("./space.controller");
const { validate } = require("./space.validate");
const { handleValidation } = require("../../services/validate");
const {
  authorization,
  authorization_conditional,
} = require("../../services/auth");

const spaceRouter = express.Router();

spaceRouter.post(
  "/",
  validate("createSpace"),
  handleValidation,
  authorization,
  SpaceController.createSpace
);

spaceRouter.get("/searchSpaces/:keyword?", SpaceController.searchSpaces);

spaceRouter.get(
  "/:id",
  validate("getSpaceDetail"),
  handleValidation,
  authorization_conditional,
  SpaceController.getSpaceDetail
);

spaceRouter.get(
  "/getAllDiscussions/:id",
  authorization_conditional,
  SpaceController.getAllDiscussions
);

module.exports = spaceRouter;

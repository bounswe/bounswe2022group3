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

spaceRouter.delete(
  "/delete",
  validate("deleteSpace"),
  handleValidation,
  authorization,
  SpaceController.deleteSpace
);

spaceRouter.get(
  "/searchSpaces/:keyword?",
  authorization_conditional,
  SpaceController.searchSpaces
);

spaceRouter.get(
  "/getRecommendedSpaces",
  authorization_conditional,
  SpaceController.getRecommendedSpaces
);

spaceRouter.get(
  "/getPopularSpaces/",
  authorization_conditional,
  SpaceController.getPopularSpaces
);

spaceRouter.get(
  "/:id",
  validate("get-space-detail"),
  handleValidation,
  authorization_conditional,
  SpaceController.getSpaceDetail
);

spaceRouter.get(
  "/getAllDiscussions/:id",
  validate("get-all-discussions"),
  handleValidation,
  authorization_conditional,
  SpaceController.getAllDiscussions
);

spaceRouter.get(
  "/getAllEvents/:id",
  validate("get-all-events"),
  handleValidation,
  authorization_conditional,
  SpaceController.getAllEvents
);

spaceRouter.post(
  "/rate",
  validate("rate-space"),
  handleValidation,
  authorization,
  SpaceController.rateSpace
);

module.exports = spaceRouter;

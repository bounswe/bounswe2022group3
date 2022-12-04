const express = require("express");
const { handleValidation } = require("../../services/validate");
const UserProfileController = require("./userProfile.controller");
const { validate } = require("./userProfile.validate");
const { authorization, authorization_conditional } = require("../../services/auth");

const userProfileRouter = express.Router();

userProfileRouter.post(
  "/updateProfile",
  validate("updateProfile"),
  handleValidation,
  authorization,
  UserProfileController.updateProfile
);

userProfileRouter.post(
  "/updatePicture",
  authorization,
  UserProfileController.updatePicture
);

userProfileRouter.post(
  "/follow",
  authorization,
  UserProfileController.follow
);

userProfileRouter.post(
  "/unfollow",
  authorization,
  UserProfileController.unfollow
);

userProfileRouter.get(
  "/getProfile/:id",
  //validate("getProfile"),
  //handleValidation,
  authorization_conditional,
  UserProfileController.getProfile
);

module.exports = userProfileRouter;

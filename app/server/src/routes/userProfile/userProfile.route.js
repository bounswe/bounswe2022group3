const express = require("express");
const { handleValidation } = require("../../services/validate");
const UserProfileController = require("./userProfile.controller");
const { validate } = require("./userProfile.validate");
const { authorization } = require("../../services/auth");

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

userProfileRouter.get(
  "/getProfile/:id",
  //validate("getProfile"),
  //handleValidation,
  UserProfileController.getProfile
);

module.exports = userProfileRouter;

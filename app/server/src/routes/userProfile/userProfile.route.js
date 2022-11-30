const express = require("express");
const { handleValidation } = require("../../services/validate");
const UserProfileController = require("./userProfile.controller");
const { validate } = require("./userProfile.validate");
const { authorization } = require("../../services/auth");

const userProfileRouter = express.Router();

userProfileRouter.post(
  "/updatePersonalInfo",
  validate("updatePersonalInfo"),
  handleValidation,
  authorization,
  UserProfileController.updatePersonalInfo
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

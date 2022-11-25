const express = require("express");
const { handleValidation } = require("../../services/validate");
const UserProfileController = require("./userProfile.controller");
const { validate } = require("./userProfile.validate");

const userProfileRouter = express.Router();

userProfileRouter.post(
  "/updatePersonalInfo",
  validate("updatePersonalInfo"),
  handleValidation,
  UserProfileController.updatePersonalInfo
);

userProfileRouter.get(
  "/getProfile/:id",
  //validate("getProfile"),
  //handleValidation,
  UserProfileController.getProfile
);

module.exports = userProfileRouter;

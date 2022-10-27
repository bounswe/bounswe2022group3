const express = require("express");
const { handleValidation } = require("../../services/validate");
const UserProfileController = require("./userProfile.controller");
const { validate } = require("./userProfile.validate");

const userProfileRouter = express.Router();

userProfileRouter.post(
    "/update",
    UserProfileController.updatePersonalInfo
)

userProfileRouter.get(
    "/getProfile",
    UserProfileController.getProfile
)

module.exports = userProfileRouter
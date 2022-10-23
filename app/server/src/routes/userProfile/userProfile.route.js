const express = require("express");
const { handleValidation } = require("../../services/validate");
const UserProfileController = require("./userProfile.controller");
const { validate } = require("./userProfile.validate");

const userProfileRouter = express.Router();

userProfileRouter.post(
    "/create",
    UserProfileController.postCreate
)

userProfileRouter.get(
    "/getProfile/:id",
    UserProfileController.getProfile
)

module.exports = userProfileRouter
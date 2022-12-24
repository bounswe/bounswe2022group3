const express = require("express");
const { handleValidation } = require("../../services/validate");
const ActivityController = require("./activity.controller");
const { validate } = require("./activity.validate");
const { authorization } = require("../../services/auth");

const activityRouter = express.Router();

activityRouter.get(
  "/getFeed",
  authorization,
  ActivityController.getFeed
);

activityRouter.delete(
  "/",
  authorization,
  ActivityController.deleteActivity
);

module.exports = activityRouter;

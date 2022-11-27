const express = require("express");
const { handleValidation } = require("../../services/validate");
const TopicController = require("./topic.controller");
const { validate } = require("./topic.validate");
const { authorization } = require("../../services/auth");

const topicRouter = express.Router();

topicRouter.post(
  "/",
  validate("create-topic"),
  handleValidation,
  authorization,
  TopicController.createTopic
);
topicRouter.get(
  "/:id",
  TopicController.getPopulatedTopic
);
topicRouter.get(
  "/getResources/:id",
  TopicController.getTopicResources
);
module.exports = topicRouter;

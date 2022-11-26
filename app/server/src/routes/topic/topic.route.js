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
  validate("get-topic"),
  handleValidation,
  TopicController.getPopulatedTopic
);
topicRouter.get(
  "/mini/:id",
  validate("get-topic-mini"),
  handleValidation,
  TopicController.getTopicMini
);
module.exports = topicRouter;

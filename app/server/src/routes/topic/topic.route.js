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
topicRouter.delete(
  "/delete",
  validate("delete-topic"),
  handleValidation,
  authorization,
  TopicController.deleteTopic
);
topicRouter.get(
  "/:id",
  validate("get-topic"),
  handleValidation,
  TopicController.getPopulatedTopic
);
topicRouter.get(
  "/getResources/:id",
  validate("get-topic-resources"),
  handleValidation,
  TopicController.getTopicResources
);
module.exports = topicRouter;

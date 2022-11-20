const express = require("express");
const { handleValidation } = require("../../services/validate");
const TopicController = require("./topic.controller");
const { validate } = require("./topic.validate");

const topicRouter = express.Router();


topicRouter.post(
    "/",
    validate("create-topic"),
    handleValidation,
    TopicController.createTopic
);
topicRouter.get(
    "/:id",
    // validate("call"),
    // handleValidation,
    TopicController.getPopulatedTopic
);
module.exports = topicRouter;

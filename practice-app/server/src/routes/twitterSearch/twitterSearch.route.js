const express = require("express");
const { validate } = require("./twitterSearch.validate");
const { handleValidation } = require("../../services/validate");
const TwitterSearchController = require("./twitterSearch.controller");

const twitterSearchRouter = express.Router();

twitterSearchRouter.post(
    "/create_rule",
    validate("create_rule"),
    handleValidation,
    TwitterSearchController.createRule
);
twitterSearchRouter.get(
    "/listen",
    TwitterSearchController.listenStream
)
twitterSearchRouter.get(
    "/rules",
    TwitterSearchController.getRules
)
twitterSearchRouter.get(
    "/getTweets",
    TwitterSearchController.getTweets
)

module.exports = twitterSearchRouter;

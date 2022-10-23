const express = require("express");
const { handleValidation } = require("../../services/validate");
const DiscussionController = require("./discussion.controller");
const { validate } = require("./discussion.validate");

const discussionRouter = express.Router();


discussionRouter.post(
    "/",
    validate("create-discussion"),
    handleValidation,
    DiscussionController.createDiscussion
);

discussionRouter.get(
    "/:id",
    // validate("call"),
    // handleValidation,
    DiscussionController.getDiscussion
);


module.exports = discussionRouter;

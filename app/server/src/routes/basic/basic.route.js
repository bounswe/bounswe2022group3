const express = require("express");
const { handleValidation } = require("../../services/validate");
const BasicController = require("./basic.controller");
const { validate } = require("./basic.validate");

const basicRouter = express.Router();

basicRouter.get(
    "/call",
    // validate("call"),
    // handleValidation,
    BasicController.getCall
);

basicRouter.get(
    "/create",
    // validate("call"),
    // handleValidation,
    BasicController.getCreate
);

basicRouter.get(
    "/delete",
    // validate("call"),
    // handleValidation,
    BasicController.getDelete
);

// Chapters...
basicRouter.post(
    "/create-chapter",
    // validate("call"),
    // handleValidation,
    BasicController.getChapterCreate
);
basicRouter.get(
    "/get-chapter/:id",
    // validate("call"),
    // handleValidation,
    BasicController.getPopulatedChapter
);

// Badges...
basicRouter.post(
    "/create-badge",
    // validate("call"),
    // handleValidation,
    BasicController.getBadgeCreate
);
basicRouter.get(
    "/get-badge/:id",
    // validate("call"),
    // handleValidation,
    BasicController.getBadge
);

// Contents ...
basicRouter.post(
    "/create-content",
    // validate("call"),
    // handleValidation,
    BasicController.getContentCreate
);

basicRouter.get(
    "/get-content/:id",
    // validate("call"),
    // handleValidation,
    BasicController.getContent
);

//Discussions ...
basicRouter.post(
    "/create-discussion",
    // validate("call"),
    // handleValidation,
    BasicController.getDiscussionCreate
);

basicRouter.get(
    "/get-discussion/:id",
    // validate("call"),
    // handleValidation,
    BasicController.getDiscussion
);

//Discussions ...
basicRouter.post(
    "/create-comment",
    // validate("call"),
    // handleValidation,
    BasicController.getCommentCreate
);

basicRouter.get(
    "/get-comment/:id",
    // validate("call"),
    // handleValidation,
    BasicController.getComment
);

module.exports = basicRouter;

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
basicRouter.get(
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
basicRouter.get(
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
basicRouter.get(
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
basicRouter.get(
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


module.exports = basicRouter;

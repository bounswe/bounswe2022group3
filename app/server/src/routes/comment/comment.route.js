const express = require("express");
const { handleValidation } = require("../../services/validate");
const CommnetController = require("./comment.controller");
const { validate } = require("./comment.validate");

const commentRouter = express.Router();

commentRouter.post(
    "/",
    validate("create-comment"),
    // handleValidation,
    CommnetController.createComment
);

commentRouter.get(
    "/:id",
    // validate("call"),
    // handleValidation,
    CommnetController.getComment
);

module.exports = commentRouter;

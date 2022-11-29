const express = require("express");
const { handleValidation } = require("../../services/validate");
const CommnetController = require("./comment.controller");
const { validate } = require("./comment.validate");
const { authorization } = require("../../services/auth");

const commentRouter = express.Router();

commentRouter.post(
  "/",
  validate("create-comment"),
  handleValidation,
  authorization,
  CommnetController.createComment
);

commentRouter.get("/:id", CommnetController.getComment);

module.exports = commentRouter;

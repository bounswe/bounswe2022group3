const express = require("express");

const api = express.Router();

const basicRouter = require("./basic/basic.route");
const chapterRouter = require("./chapter/chapter.route");
const discussionRouter = require("./discussion/discussion.route");
const commentRouter = require("./comment/comment.route");
const badgeRouter = require("./badge/badge.route");
const contentRouter = require("./content/content.route");
const userRouter = require("./user/user.route");

api.use("/basic", basicRouter);
api.use("/chapter", chapterRouter)
api.use("/discussion", discussionRouter)
api.use("/comment", commentRouter)
api.use("/badge", badgeRouter)
api.use("/content", contentRouter)
api.use("/user", userRouter)

module.exports = {
  api,
};

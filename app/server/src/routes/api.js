const express = require("express");

const api = express.Router();

const userProfileRouter = require("./userProfile/userProfile.route");
const topicRouter = require("./topic/topic.route");
const discussionRouter = require("./discussion/discussion.route");
const commentRouter = require("./comment/comment.route");
const badgeRouter = require("./badge/badge.route");
const resourceRouter = require("./resource/resource.route");
const noteRouter = require("./note/note.route");
const userRouter = require("./user/user.route");
const spaceRouter = require("./space/space.route");
const enrollmentRouter = require("./enrollment/enrollment.route");
const annotationRouter = require("./annotation/annotation.route");

api.use("/userProfile", userProfileRouter);
api.use("/topic", topicRouter);
api.use("/discussion", discussionRouter);
api.use("/comment", commentRouter);
api.use("/badge", badgeRouter);
api.use("/resource", resourceRouter);
api.use("/note", noteRouter);
api.use("/user", userRouter);
api.use("/space", spaceRouter);
api.use("/enrollment", enrollmentRouter);
api.use("/annotation", annotationRouter);

module.exports = {
  api,
};

const express = require("express");
const usersRouter = require("./users/users.route");
const twitterSearchRouter = require("./twitterSearch/twitterSearch.route")
const api = express.Router();

api.use("/users", usersRouter);
api.use("/twitterSearch", twitterSearchRouter);

module.exports = {
  api,
};
const express = require("express");
const usersRouter = require("./users/users.route");

const api = express.Router();

api.use("/users", usersRouter);

module.exports = {
  api,
};
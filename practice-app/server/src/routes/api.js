const express = require("express");
const chessRouter = require("./chess/chess.route");
const usersRouter = require("./users/users.route");
const verifyRouter = require("./verify/verify.route");

const api = express.Router();

api.use("/users", usersRouter);
api.use("/chess", chessRouter);
api.use("/verify", verifyRouter);

module.exports = {
  api,
};
const express = require("express");
const chessRouter = require("./chess/chess.route");
const usersRouter = require("./users/users.route");
const coinRouter = require("./coin/coin.route");

const api = express.Router();

api.use("/users", usersRouter);
api.use("/chess", chessRouter);
api.use("/coin", coinRouter);

module.exports = {
  api,
};
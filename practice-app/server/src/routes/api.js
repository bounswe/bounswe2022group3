const express = require("express");
const chessRouter = require("./chess/chess.route");
const usersRouter = require("./users/users.route");
const currencyRouter = require("./currency/currency.route");
const twitterSearchRouter = require("./twitterSearch/twitterSearch.route")
const coinRouter = require("./coin/coin.route")

const api = express.Router();

api.use("/users", usersRouter);
api.use("/chess", chessRouter);
api.use("/currency", currencyRouter);
api.use("/twitterSearch", twitterSearchRouter);
api.use("/coin", coinRouter)

module.exports = {
  api,
};
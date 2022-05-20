const express = require("express");
const chessRouter = require("./chess/chess.route");
const usersRouter = require("./users/users.route");
const currencyRouter = require("./currency/currency.route");
const twitterSearchRouter = require("./twitterSearch/twitterSearch.route")
const movieRouter = require("./movies/movies.route");
const coinRouter = require("./coin/coin.route")
const postRouter = require("./posts/post.route");



const api = express.Router();

api.use("/users", usersRouter);

api.use("/chess", chessRouter);
api.use("/currency", currencyRouter);
api.use("/twitterSearch", twitterSearchRouter);
api.use("/movies", movieRouter);
api.use("/coin", coinRouter)
api.use("/post", postRouter);


module.exports = {
  api,
};

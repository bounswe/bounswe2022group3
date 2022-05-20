const express = require("express");
const chessRouter = require("./chess/chess.route");
const usersRouter = require("./users/users.route");
const currencyRouter = require("./currency/currency.route");
const twitterSearchRouter = require("./twitterSearch/twitterSearch.route")
<<<<<<< HEAD
const movieRouter = require("./movies/movies.route");
=======
const coinRouter = require("./coin/coin.route")

>>>>>>> c37cbe6be37c83c30c702e82984c7453ba12ac9d
const api = express.Router();

api.use("/users", usersRouter);
api.use("/chess", chessRouter);
api.use("/currency", currencyRouter);
api.use("/twitterSearch", twitterSearchRouter);
<<<<<<< HEAD
api.use("/movies", movieRouter);
=======
api.use("/coin", coinRouter)
>>>>>>> c37cbe6be37c83c30c702e82984c7453ba12ac9d

module.exports = {
  api,
};
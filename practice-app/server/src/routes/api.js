const express = require("express");

const api = express.Router();

const chessRouter = require("./chess/chess.route");
const usersRouter = require("./users/users.route");
const currencyRouter = require("./currency/currency.route");
const twitterSearchRouter = require("./twitterSearch/twitterSearch.route")
const movieRouter = require("./movies/movies.route");
const coinRouter = require("./coin/coin.route")
const quizRouter = require("./quiz/quiz.route");
const postRouter = require("./posts/post.route");
const verifyRouter = require("./verify/verify.route");
const lyricsRouter = require("./lyrics/lyrics.route");

api.use("/users", usersRouter);
api.use("/chess", chessRouter);
api.use("/lyrics", lyricsRouter);
api.use("/currency", currencyRouter);
api.use("/twitterSearch", twitterSearchRouter);
api.use("/movies", movieRouter);
api.use("/quiz", quizRouter);
api.use("/coin", coinRouter);
api.use("/post", postRouter);
api.use("/verify", verifyRouter);


module.exports = {
  api,
};

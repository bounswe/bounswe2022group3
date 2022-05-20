const express = require("express");

const api = express.Router();

const chessRouter = require("./chess/chess.route");
const usersRouter = require("./users/users.route");
const currencyRouter = require("./currency/currency.route");
const twitterSearchRouter = require("./twitterSearch/twitterSearch.route")
const quizRouter = require("./quiz/quiz.route");
const quizRouter = require("./quiz/quiz.route");

const api = express.Router();

api.use("/users", usersRouter);
api.use("/chess", chessRouter);
api.use("/currency", currencyRouter);
api.use("/twitterSearch", twitterSearchRouter);
api.use("/quiz", quizRouter);

module.exports = {
  api,
};
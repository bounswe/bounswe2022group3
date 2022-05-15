const express = require("express");
const quizRouter = require("./quiz/quiz.route");

const api = express.Router();

api.use("/quiz", quizRouter);

module.exports = {
  api,
};
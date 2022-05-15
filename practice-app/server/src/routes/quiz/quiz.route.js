const express = require("express");
const quizController = require("./quiz.controller");

const quizRouter = express.Router();

quizRouter.get
(
    "/one_shot",
    quizController.oneShotCategorySaver
);



module.exports = quizRouter;

const express = require("express");
const quizController = require("./quiz.controller");
const { validate } = require("./quiz.validate")
const quizRouter = express.Router();

/*quizRouter.get
(
    "/one_shot",
    quizController.oneShotCategorySaver
);*/
quizRouter.get(
    "/categories",
    quizController.quizCategoryInfo
);

quizRouter.post(
    "/new_quiz",
    validate("create_quiz"),
    quizController.createQuiz
);


module.exports = quizRouter;

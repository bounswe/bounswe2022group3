const express = require("express");
const quizController = require("./quiz.controller");

const quizRouter = express.Router();

/*quizRouter.get
(
    "/one_shot",
    quizController.oneShotCategorySaver
);*/
quizRouter.get
(
    "/categories",
    quizController.quizCategoryInfo
);

quizRouter.post(
    "/new_quiz",
    quizController.createQuiz
);


module.exports = quizRouter;

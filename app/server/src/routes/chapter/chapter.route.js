const express = require("express");
const { handleValidation } = require("../../services/validate");
const ChapterController = require("./chapter.controller");
const { validate } = require("./chapter.validate");

const chapterRouter = express.Router();


chapterRouter.post(
    "/",
    validate("create-chapter"),
    handleValidation,
    ChapterController.createChapter
);
chapterRouter.get(
    "/:id",
    // validate("call"),
    // handleValidation,
    ChapterController.getPopulatedChapter
);
module.exports = chapterRouter;

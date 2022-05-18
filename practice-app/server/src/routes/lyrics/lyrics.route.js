const express = require("express");
const { validate } = require("./lyrics.validate");
const { handleValidation } = require("../../services/validate");
const LyricsController = require("./lyrics.controller");

const lyricsRouter = express.Router();

lyricsRouter.post(
    "/search_lyrics",
    validate("search_lyrics"),
    handleValidation,
    LyricsController.searchLyrics
);

lyricsRouter.post(
    "/save_lyrics",
    validate("save_lyrics"),
    handleValidation,
    LyricsController.saveLyrics
);

lyricsRouter.get(
    "/saved_lyrics",
    validate("saved_lyrics"),
    handleValidation,
    LyricsController.savedLyrics
);

module.exports = lyricsRouter;

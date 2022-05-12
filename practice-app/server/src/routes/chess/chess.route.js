const express = require("express");
const { validate } = require("./chess.validate");
const { handleValidation } = require("../../services/validate");
const ChessController = require("./chess.controller");

const chessRouter = express.Router();

chessRouter.post(
    "/create_game",
    validate("create_game"),
    handleValidation,
    ChessController.createGame
);

module.exports = chessRouter;

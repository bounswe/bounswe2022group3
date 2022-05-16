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

chessRouter.post(
    "/make_move",
    validate("make_move"),
    handleValidation,
    ChessController.makeMove
);

chessRouter.get(
    "/stream_game/:gameId",
    ChessController.streamGame
);

chessRouter.get(
    "/games",
    ChessController.getGames
);

chessRouter.get(
    "/game/:gameId",
    ChessController.getGame
);

module.exports = chessRouter;

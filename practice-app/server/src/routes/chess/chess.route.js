const express = require("express");
const { validate } = require("./chess.validate");
const { handleValidation } = require("../../services/validate");
const { authorization } = require("../../services/auth")
const ChessController = require("./chess.controller");

const chessRouter = express.Router();

chessRouter.post(
    "/create_game",
    validate("create_game"),
    handleValidation,
    authorization,
    ChessController.createGame
);

chessRouter.post(
    "/make_move",
    validate("make_move"),
    handleValidation,
    authorization,
    ChessController.makeMove
);

chessRouter.get(
    "/stream_game/:gameId",
    authorization,
    ChessController.streamGame
);

chessRouter.get(
    "/games",
    authorization,
    ChessController.getGames
);

chessRouter.get(
    "/game/:gameId",
    authorization,
    ChessController.getGame
);

module.exports = chessRouter;

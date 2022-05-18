const express = require("express");
const chessRouter = require("./chess/chess.route");
const usersRouter = require("./users/users.route");
const lyricsRouter = require("./lyrics/lyrics.route");

const api = express.Router();

api.use("/users", usersRouter);
api.use("/chess", chessRouter);
api.use("/lyrics", lyricsRouter);

module.exports = {
  api,
};
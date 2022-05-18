const express = require("express");
const chessRouter = require("./chess/chess.route");
const usersRouter = require("./users/users.route");
const currencyRouter = require("./currency/currency.route");


const api = express.Router();

api.use("/users", usersRouter);
api.use("/chess", chessRouter);

module.exports = {
  api,
};
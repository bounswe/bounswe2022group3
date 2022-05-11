const express = require("express");
const usersRouter = require("./users/users.route");
const currencyRouter = require("./currency/currency.route");


const api = express.Router();

api.use("/users", usersRouter);
api.use("/currency", currencyRouter);


module.exports = {
  api,
};
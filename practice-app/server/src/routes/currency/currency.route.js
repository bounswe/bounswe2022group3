const express = require("express");
// const { handleValidation } = require("../../services/validate");
const CurrencyController = require("./currency.controller");

const currencyRouter = express.Router();

currencyRouter.get(
    "/getConversion",
    // validate("create_game"),
    // handleValidation,
    CurrencyController.getConversion
);

currencyRouter.post(
    "/allConversions",
    CurrencyController.allConversions
)

module.exports = currencyRouter;
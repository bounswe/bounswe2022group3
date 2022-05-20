const express = require("express");
const path = require('path')
// const { handleValidation } = require("../../services/validate");
const booksController = require("./books.controller");

const booksRouter = express.Router();

booksRouter.get(
    '/getArticle',
    booksController.getArticle
);
currencyRouter.post(
    "/key",
    CurrencyController.allConversions
)

module.exports = booksRouter;




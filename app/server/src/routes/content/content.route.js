const express = require("express");
const { handleValidation } = require("../../services/validate");
const ContentController = require("./content.controller");
const { validate } = require("./content.validate");

const contentRouter = express.Router();

// Contents ...
contentRouter.post(
    "/",
    validate("create-content"),
    // handleValidation,
    ContentController.createContent
);

contentRouter.get(
    "/:id",
    // validate("call"),
    // handleValidation,
    ContentController.getContent
);

module.exports = contentRouter;

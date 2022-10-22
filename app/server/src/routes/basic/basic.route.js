const express = require("express");
const { handleValidation } = require("../../services/validate");
const BasicController = require("./basic.controller");
const { validate } = require("./basic.validate");

const basicRouter = express.Router();

basicRouter.get(
    "/call",
    // validate("call"),
    // handleValidation,
    BasicController.getCall
);

basicRouter.get(
    "/create",
    // validate("call"),
    // handleValidation,
    BasicController.getCreate
);

basicRouter.get(
    "/delete",
    // validate("call"),
    // handleValidation,
    BasicController.getDelete
);

module.exports = basicRouter;
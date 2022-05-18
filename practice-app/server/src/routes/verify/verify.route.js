const express = require("express");
const EmailController = require("./verify.controller");
const { validate } = require("./verify.validate");
const { handleValidation } = require("../../services/validate");

const verifyRouter = express.Router();

verifyRouter.post(
    "/verifyEmail",
    validate("verify"),
    handleValidation,
    EmailController.verifyEmail
);

verifyRouter.post(
    "/saveEmail",
    validate("verify"),
    handleValidation,
    EmailController.saveEmail
);

verifyRouter.get(
    "/getEmails",
    validate("verify"),
    handleValidation,
    EmailController.getEmails
);


module.exports = verifyRouter;

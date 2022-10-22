const express = require("express");
const { handleValidation } = require("../../services/validate");
const UserController = require("./user.controller");
const { validate } = require("./user.validate");
const auth = require("../../services/auth");

const userRouter = express.Router();

userRouter.post(
    "/register",
    validate("register"),
    handleValidation,
    UserController.register
);
userRouter.post(
    "/login",
    validate("login"),
    handleValidation,
    UserController.login
);
userRouter.post(
    "/refresh_tokens",
    validate("refresh_tokens"),
    handleValidation,
    UserController.refresh_tokens
);

module.exports = userRouter;

const express = require("express");
const { handleValidation } = require("../../services/validate");
const UserController = require("./user.controller");
const { validate } = require("./user.validate");
const { authorization } = require("../../services/auth")

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
    "/logout",
    authorization,
    UserController.logout
);
userRouter.post(
    "/refresh_tokens",
    validate("refresh_tokens"),
    handleValidation,
    UserController.refresh_tokens
);
// TODO: Check if conf token expired, if so send new one
userRouter.post(
    "/confirm-email",
    validate("confirm-email"),
    handleValidation,
    UserController.confirmEmail
);
userRouter.post(
    "/resend_confirmation",
    validate("resend_confirmation"),
    handleValidation,
    UserController.resend_confirmation
);

module.exports = userRouter;

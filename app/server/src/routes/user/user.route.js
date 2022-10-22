const express = require("express");
const { handleValidation } = require("../../services/validate");
const UserController = require("./user.controller");
const { validate } = require("./user.validate");
const auth = require("../../services/auth");

const userRouter = express.Router();

userRouter.post(
    "/register",
    // validate("register"),
    // handleValidation,
    UserController.register
);
userRouter.post(
    "/login",
    // validate("login"),
    // handleValidation,
    UserController.login
);
userRouter.post(
    "/refresh_access_token",
    // validate("login"),
    // handleValidation,
    UserController.refresh_access_token
);
userRouter.post(
    "/confirmEmail",
    // validate("login"),
    // handleValidation,
    UserController.confirmEmail
);

module.exports = userRouter;

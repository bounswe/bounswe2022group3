const express = require("express");
const { handleValidation } = require("../../services/validate");
const UserController = require("./user.controller");
const { validate } = require("./user.validate");

const userRouter = express.Router();

userRouter.post(
    "/register",
    // validate("register"),
    // handleValidation,
    UserController.register
);
userRouter.post(
    "/login",
    validate("login"),
    handleValidation,
    UserController.login
);


module.exports = userRouter;

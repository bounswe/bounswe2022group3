const express = require("express");
const { validate } = require("./users.validate");
const { handleValidation } = require("../../services/validate");
const { authorization } = require("../../services/auth")
const UserController = require("./users.controller");

const usersRouter = express.Router();

usersRouter.post(
    "/register",
    validate("register"),
    handleValidation,
    UserController.register
);
usersRouter.post(
    "/login",
    validate("login"),
    handleValidation,
    UserController.login
);
usersRouter.post(
    "/tryAuth",
    authorization,
    UserController.trialEndpoint
);



module.exports = usersRouter;

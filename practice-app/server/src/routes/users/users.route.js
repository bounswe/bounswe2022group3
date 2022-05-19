const express = require("express");
const { validate } = require("./users.validate");
const { handleValidation } = require("../../services/validate");
const UserController = require("./users.controller");

const usersRouter = express.Router();

usersRouter.post(
    "/register",
    validate("register"),
    handleValidation,
    UserController.register
);

module.exports = usersRouter;

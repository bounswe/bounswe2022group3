const express = require("express");
const { handleValidation } = require("../../services/validate");
const BadgeController = require("./badge.controller");
const { validate } = require("./badge.validate");

const badgeRouter = express.Router();

badgeRouter.post(
    "/",
    validate("create-badge"),
    handleValidation,
    BadgeController.createBadge
);
badgeRouter.get(
    "/:id",
    // validate("call"),
    // handleValidation,
    BadgeController.getBadge
);

module.exports = badgeRouter;

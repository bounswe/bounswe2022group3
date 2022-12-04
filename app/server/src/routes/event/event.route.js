const express = require("express");
const { handleValidation } = require("../../services/validate");
const EventController = require("./event.controller");
const { validate } = require("./event.validate");
const { authorization } = require("../../services/auth");

const eventRouter = express.Router();

eventRouter.post(
    "/",
    validate("create-event"),
    handleValidation,
    authorization,
    EventController.createEvent
);

eventRouter.post(
    "/participate/:event_id",
    validate("participate"),
    handleValidation,
    authorization,
    EventController.participateToEvent
);

eventRouter.post(
    "/unparticipate/:event_id",
    validate("unparticipate"),
    handleValidation,
    authorization,
    EventController.unparticipateToEvent
);

eventRouter.get(
    "/:id",
    validate("get-event"),
    handleValidation,
    authorization,
    EventController.getEvent
);

// TODO: remove participant
// eventRouter.post(
//     "/un-participate/:event_id",
//     // validate("participate-to-event"),
//     // handleValidation,
//     // authorization,
//     // EventController.createEvent
// );

module.exports = eventRouter;

const express = require("express");
const { handleValidation } = require("../../services/validate");
const NoteController = require("./note.controller");
const { validate } = require("./note.validate");
const { authorization } = require("../../services/auth");

const noteRouter = express.Router();

noteRouter.post(
  "/",
  validate("create-note"),
  handleValidation,
  authorization,
  NoteController.createNote
);

noteRouter.delete(
  "/delete",
  validate("delete-note"),
  handleValidation,
  authorization,
  NoteController.deleteNote
);

noteRouter.get(
  "/:id",
  authorization,
  NoteController.getNote
);

noteRouter.get(
  "/getNoteList/:space_id",
  authorization,
  NoteController.getNoteList
);

noteRouter.put(
  "/update",
  validate("update-note"),
  handleValidation,
  authorization,
  NoteController.updateNote
);


module.exports = noteRouter;

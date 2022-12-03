const { body, query } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create-note":
      return [
        body("title", "title doesn't exist").exists(),
        body("body", "body doesn't exist").exists(),
        body("resource_id", "resource_id doesn't exist or broken").exists().isMongoId(),
      ];
    case "delete-note":
      return [
        body("note_id", "note_id doesn't exist or broken").exists().isMongoId(),
      ];
    case "update-note":
      return [
        body("note_id", "note_id doesn't exist or broken").exists().isMongoId(),
      ];
    case "get-note-list":
      return [
        body("space_id", "space_id doesn't exist or broken").exists().isMongoId(),
      ];
  }
};

const { body, query } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create-note":
      return [
        body("title", "title doesn't exist").exists(),
        body("body", "body doesn't exist").exists(),
        body("space_id", "topic_id doesn't exist or broken").exists().isMongoId(),
      ];
    case "delete-note":
      return [
        body("note_id", "note_id doesn't exist or broken").exists().isMongoId(),
      ];
    case "update-note":
      return [
        body("note_id", "note_id doesn't exist or broken").exists().isMongoId(),
      ];
  }
};

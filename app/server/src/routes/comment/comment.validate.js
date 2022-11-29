const { body, query } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create-comment":
      return [
        body("comment", "comment doesn't exist").exists(),
        body("discussion_id", "discussion_id don't exist").exists(),
      ];
  }
};

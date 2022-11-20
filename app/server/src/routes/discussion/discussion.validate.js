const { body, query } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create-discussion":
      return [
        body("user", "user doesn't exist").exists(),
        body("space", "space doesn't exist").exists(),
        body("comments", "comments don't exist").exists().isArray(),
        body("body", "body doesn't exist").exists(),
        body("files", "files don't exist").exists().isArray(),
      ];
  }
};

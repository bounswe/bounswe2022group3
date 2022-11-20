const { body, query } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create-comment":
      return [
        body("user", "user doesn't exist").exists(),
        body("body", "body doesn't exist").exists(),
        body("files", "files don't exist").exists().isArray(),
      ];
  }
};

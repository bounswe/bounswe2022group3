const { body, query } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create-discussion":
      return [
        body("space_id", "space doesn't exist").exists(),
        body("title", "title doesn't exist").exists(),
      ];
  }
};

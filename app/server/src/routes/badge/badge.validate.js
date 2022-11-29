const { body, query } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create-badge":
      return [
        body("title", "title doesn't exist").exists(),
        body("description", "description doesn't exist").exists(),
      ];
  }
};

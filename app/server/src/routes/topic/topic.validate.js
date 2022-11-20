const { body, query } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create-topic":
      return [
        body("name", "name doesn't exist").exists(),
        body("badge", "badge doesn't exist").exists(),
        body("resources", "resources don't exist").exists().isArray(),
      ];
  }
};

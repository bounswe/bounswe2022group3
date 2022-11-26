const { body, query } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create-resource":
      return [
        body("name", "name doesn't exist").exists(),
        body("body", "body doesn't exist").exists(),
        body("topic_id", "topic_id doesn't exist").exists(),
      ];
    case "get-resource":
      return [
        body("id", "id doesn't exist").exists(),
      ];
    case "update-resource":
      return [
        body("resource_id", "resource_id doesn't exist").exists(),
      ];
  }
};

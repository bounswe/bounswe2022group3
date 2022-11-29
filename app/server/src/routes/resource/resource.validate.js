const { body, query } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create-resource":
      return [
        body("name", "name doesn't exist").exists(),
        body("body", "body doesn't exist").exists(),
        body("topic_id", "topic_id doesn't exist or broken").exists().isMongoId(),
      ];
    case "delete-resource":
      return [
        body("resource_id", "resource_id doesn't exist or broken").exists().isMongoId(),
      ];
    case "update-resource":
      return [
        body("resource_id", "resource_id doesn't exist or broken").exists().isMongoId(),
      ];
    case "rate-resource":
      return [
        body("resource_id", "resource_id doesn't exist or broken").exists().isMongoId(),
        body("rating", "rating doesn't exist").exists(),
      ];
  }
};

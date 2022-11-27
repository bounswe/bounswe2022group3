const { body, query } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create-resource": {
      return [
        body("name", "name doesn't exist").exists(),
        body("body", "body doesn't exist").exists(),
        body("topic_id", "topic_id doesn't exist").exists(),
      ];
    }
    case "delete-resource": {
      return [body("resource_id", "resource_id doesn't exist").exists()];
    }
    case "get-resource": {
      return [param("id", "id does not exist").exists()];
    }
    case "update-resource": {
      return [body("resource_id", "resource_id doesn't exist").exists()];
    }
    case "rate-resource": {
      return [
        body("resource_id", "resource_id doesn't exist").exists(),
        body("rating", "rating doesn't exist").exists(),
      ];
    }
  }
};

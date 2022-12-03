const { body, param } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create-annotation": {
      return [
        body("context", "context doesn't exist").exists(),
        body("type", "type doesn't exist").exists(),
        body("body", "body doesn't exist").exists(),
        body("target", "target doesn't exist").exists(),
        body("id", "id doesn't exist").exists(),
        body("resource", "resource doesn't exist").exists(),
      ];
    }
    case "update-annotation": {
      return [body("id", "id does not exist").exists()];
    }
    case "get-annotation": {
      return [param("id", "id does not exist").exists()];
    }
    case "get-resource-annotations": {
      return [
        param("resource_id", "resource_id does not exist").exists().isMongoId(),
      ];
    }
    case "delete-annotation": {
      return [body("id", "id does not exist").exists()];
    }
  }
};

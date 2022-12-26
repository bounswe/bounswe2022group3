const { body, param } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createSpace": {
      return [
        body("name", "name does not exist").exists(),
        body("info", "info does not exist").exists(),
        body("tags", "tags do not exist").exists(),
        body("image", "image does not exist").exists(),
      ];
    }
    case "deleteSpace": {
      return [
        body("space_id", "space_id does not exist").exists().isMongoId(),
      ];
    }
    case "get-space-detail": {
      return [param("id", "id does not exist").exists().isMongoId()];
    }
    case "get-all-discussions": {
      return [param("id", "id does not exist").exists().isMongoId()];
    }
    case "get-all-events": {
      return [param("id", "id does not exist").exists().isMongoId()];
    }
    case "rate-space": {
      return [
        body("space_id", "space_id does not exist")
          .exists()
          .isMongoId(),
        body("rating", "rating doesn't exist").exists(),
      ];
    }
  }
};

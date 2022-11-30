const { body, param } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create-topic": {
      return [
        body("name", "name doesn't exist").exists(),
        body("space_id", "space_id doesn't exist").exists(),
      ];
    }
    case "get-topic": {
      return [param("id", "id does not exist").exists()];
    }
    case "get-topic-resources": {
      return [param("id", "id does not exist").exists()];
    }
  }
};

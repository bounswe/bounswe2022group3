const { body, param } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createEnrollment": {
      return [body("space_id", "space_id doesn't exist").exists()];
    }
    case "getEnrollment": {
      return [
        param("id", "id doesn't exist").exists().isMongoId()
    ];
    }
  }
};

const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "updateProfile": {
      return [
        body("bio", "Bio doesn't exist.").exists(),
        body("interests", "Interests doesn't exist.").exists().isArray(),
        body("knowledge", "Knowledge doesn't exist.").exists().isArray(),
      ];
    }
    case "disinterest": {
      return [
        body("space_id", "space_id doesn't exist.").exists()
      ];
    }
  }
};

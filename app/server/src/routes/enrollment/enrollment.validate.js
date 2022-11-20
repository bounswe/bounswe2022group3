const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createEnrollment": {
      return [body("space", "space doesn't exist").exists()];
    }
  }
};

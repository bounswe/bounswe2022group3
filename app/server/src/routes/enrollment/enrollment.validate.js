const {body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createEnrollment": {
      return [
        body("space_id", "space_id does not exist").exists(),
      ];
    }
  }
};

const {body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createEnrollment": {
      return [
        body("user_id", "user_id does not exist").exists(),
        body("course_id", "course_id does not exist").exists(),
      ];
    }
  }
};

const {body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createEnrollment": {
      return [
        body("course_id", "course_id does not exist").exists(),
      ];
    }
    case "deleteEnrollment": {
      return [
        body("course_id", "course_id does not exist").exists(),
      ];
    }
  }
};

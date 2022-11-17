const {body,param } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createEnrollment": {
      return [
        body("course_id", "course_id does not exist").exists().isMongoId(),
      ];
    }
    case "getEnrollment": {
      return [
        param("course_id", "course_id does not exist").exists().isMongoId(),
      ];
    }
    case "deleteEnrollment": {
      return [
        body("course_id", "course_id does not exist").exists().isMongoId(),
      ];
    }
  }
};

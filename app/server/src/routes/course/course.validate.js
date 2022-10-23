const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createCourse": {
      return [
        body("name", "name does not exist").exists(),
        body("lecturer_id", "lecturer_id does not exist").exists(),
        body("lecturer_id", "lecturer_id does not exist").exists(),
        body("info", "info does not exist").exists(),
        body("chapters", "chapters does not exist").exists(),
        body("tags", "tags does not exist").exists(),
        body("image", "image does not exist").exists(),
      ];
    }
    case "getCourses": {
    }
    case "getCourseDetail": {
    }
  }
};

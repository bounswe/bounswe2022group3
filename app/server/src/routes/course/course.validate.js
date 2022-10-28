const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createCourse": {
      return [
        body("name", "name does not exist").exists(),
        body("lecturer", "lecturer does not exist").exists(),
        body("info", "info does not exist").exists(),
        body("rating", "rating does not exist").exists(),
        body("chapters", "chapters does not exist").exists(),
        body("tags", "tags does not exist").exists(),
        body("badges", "badges does not exist").exists(),
        body("feedback", "feedback does not exist").exists(),
        body("event_list", "event_list does not exist").exists(),
        body("discussion_list", "discussion_list does not exist").exists(),
        body("poll_list", "poll_list does not exist").exists(),
        body("enrollments", "enrollments does not exist").exists(),
        body("image", "image does not exist").exists(),
      ];
    }
    case "getCourses": {
      return [
        body("name", "name does not exist").exists(),
        body("rating", "rating does not exist").exists(),
        body("image", "image does not exist").exists(),
        body("lecturer", "lecturer does not exist").exists(),
      ]
    }
    case "getCourseDetail": {
      return [
        body("name", "name does not exist").exists(),
        body("info", "info does not exist").exists(),
        body("rating", "rating does not exist").exists(),
        body("lecturer", "lecturer does not exist").exists(),
        body("tags", "tags do not exist").exists(),
        body("chapters", "chapters do not exist").exists(),
        body("image", "image does not exist").exists(),
      ]
    }
  }
};

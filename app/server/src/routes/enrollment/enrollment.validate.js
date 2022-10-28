const {body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createEnrollment": {
      return [
        body("user_id", "user_id does not exist").exists(),
        body("course", "course does not exist").exists(),
        body("course_id", "course_id does not exist").exists(),
        body("is_active", "is_active does not exist").exists(),
        body("notes", "notes does not exist").exists(),
        body("progress", "progress does not exist").exists(),
      ];
    }
    case "getEnrolledCourses": {
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
      ]
    }
  }
};

const { body, query } = require("express-validator");

exports.validate = (method) => {
    switch (method) {
        case "create-discussion":
            return [
                body("user_id", "user_id doesn't exist").exists(),
                body("course_id", "course_id doesn't exist").exists(),
                body("comment_id_list", "comment_id_list doesn't exist").exists().isArray(),
                body("discussion_body", "discussion_body doesn't exist").exists(),
                body("discussion_files", " doesn't exist").exists().isArray(),
            ]
    }
};

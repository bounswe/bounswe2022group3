const { body, query } = require("express-validator");

exports.validate = (method) => {
    switch (method) {
        case "create-comment":
            return [
                body("user_id", "user_id doesn't exist").exists(),
                body("comment_body", "comment_body doesn't exist").exists(),
                body("comment_files", "comment_files doesn't exist").exists().isArray(),
            ]
    }
};

const { body, query } = require("express-validator");

exports.validate = (method) => {
    switch (method) {
        case "create-chapter":
            return [
                body("chapter_name", "chapter_name doesn't exist").exists(),
                body("chapter_badge_id", "chapter_badge_id doesn't exist").exists(),
                body("content_id_list", "content_id_list doesn't exist").exists().isArray(),
            ]

    }
};

const { body, query } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create-discussion":
      return [
        body("user_id", "user_id doesn't exist").exists(),
        body("space_id", "space_id doesn't exist").exists(),
        body("comment_id_list", "comment_id_list doesn't exist")
          .exists()
          .isArray(),
        body("body", "body doesn't exist").exists(),
        body("files", "files don't exist").exists().isArray(),
      ];
  }
};

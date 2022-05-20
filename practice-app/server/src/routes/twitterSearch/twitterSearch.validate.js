const { body,query } = require("express-validator");

exports.validate = (method) => {
    switch (method) {
        case "create_rule": {
            return [
                body("hashtag", "please provide a hashtag").exists().isString().isLength({ min: 3 }),
            ];
        }
        case "delete_rule": {
            return [
                query("id", "please provide id of the rule").exists().isString(),
            ];
        }
        case "get_tweets": {
            return [
                body("tags", "please provide a list of tags").exists().isArray(),
            ];
        }
    }
};

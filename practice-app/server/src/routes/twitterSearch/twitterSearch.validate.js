const { body,query } = require("express-validator");

exports.validate = (method) => {
    switch (method) {
        case "create_rule": {
            return [
                body("hashtag", "please provide a hashtag").exists().isString().isLength({ min: 3 }),
                body("has_image", "indicate whether tweets must include images or nor").exists().isBoolean(),
                body("lang", "please provide a language").exists().isString().isLength({ min: 1 }),
            ];
        }
    }
};

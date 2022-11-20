const { body, query } = require("express-validator");

exports.validate = (method) => {
    switch (method) {
        case "create-resource":
            return [
                body("name", "name doesn't exist").exists(),
                body("body", "body doesn't exist").exists(),
                body("discussion", "discussion doesn't exist").exists(),
                body("media", "media doesn't exist").exists().isArray(),
            ]
    }
};

const { body } = require("express-validator");

exports.validate = (method) => {
    switch (method) {
        case "updatePersonalInfo": {
            return [
                body("id", "ID doesn't exist.").exists(),
                body("bio", "Bio doesn't exist.").exists(),
            ];
        }
    }
};
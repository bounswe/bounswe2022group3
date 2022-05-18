const { body } = require("express-validator");

exports.validate = (method) => {
    switch (method) {
        case "verify": {
            return [
                body("email")
           ];
        }
    }
};

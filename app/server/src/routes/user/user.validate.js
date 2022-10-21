const { body } = require("express-validator");

exports.validate = (method) => {
    switch (method) {
        case "register": {
            return [
                body("name", "name doesn't exist").exists(),
                body("surname", "surname doesn't exist").exists(),
                body("email", "Invalid email").exists().isEmail(),
                body("password", "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character").exists().isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
            ];
        }
        case "login": {
            return [
                body("email", "Invalid email").exists().isEmail(),
                body("password", "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character").exists().isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
            ];
        }
    }
};

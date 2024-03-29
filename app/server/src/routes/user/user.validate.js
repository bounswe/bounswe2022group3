const { body } = require("express-validator");

exports.validate = (method) => {
    switch (method) {
        case "register": {
            return [
                body("name", "name doesn't exist").exists(),
                body("surname", "surname doesn't exist").exists(),
                body("email", "Invalid email").exists().isEmail(),
                body("password", "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character").exists().isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.])(?=.{8,})/),
                body("agreement", "Agreement to ToS and Pivacy Policy is missing!").exists().isBoolean(),
            ];
        }
        case "login": {
            return [
                body("email", "Invalid email").exists().isEmail(),
                body("password", "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character").exists().isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.])(?=.{8,})/),
            ];
        }
        case "refresh_tokens": {
            return [
                body("email", "Invalid email").exists().isEmail(),
                body("refresh_token", "Invalid token").exists(),
            ];
        }
        case "confirm-email": {
            return [
                body("code", "code does not exist").exists().isJWT(),
            ];
        }
        case "resend_confirmation": {
            return [
                body("email", "Invalid email").exists().isEmail(),
            ];
        }
    }
};

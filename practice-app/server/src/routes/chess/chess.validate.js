const { body } = require("express-validator");

exports.validate = (method) => {
    switch (method) {
        case "create_game": {
            return [
                body("difficulty", "difficulty is incorrect or not provided").exists().isInt({ min: 1, max: 8 }),
                body("color", "color is incorrect or not provided").exists().isIn(["random", "white", "black"]),
            ];
        }
    }
};

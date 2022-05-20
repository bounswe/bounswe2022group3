const { body } = require('express-validator')

exports.validate = (method) => {
    switch (method) {
        case "create_quiz":
            {

                return [
                    body("categories", "Please choose at least one category").isArray().isLength({ min: 1 }),
                    body("categories.*._questionCount", "Please enter a value between 1 and 50").exists().isInt({ min: 1, max: 50 }),
                    body("categories.*._category").custom(value => {
                        if (value === "" || value <= 32 || value >= 9) return true
                        else return false
                    }).withMessage("Please enter a value between 8 and 32")
                ]
            }


    }
}

const { body, query } = require("express-validator");

exports.validate = (method) => {
    switch (method) {
        case "getConversion": {
            console.log(1)
            return [
                query("from", "from is incorrect or not provided")
                    .exists().isString(),
                query("to", "from is incorrect or not provided")
                    .exists().isString(),
                query("amount", "from is incorrect or not provided")
                    .exists()
                    .isFloat(),
            ];
        }
        case "allConversions": {
            
            return [
                body("allCurrencies", "allCurrencies array is not provided").exists().isArray(),
            ];
        }
    }
};

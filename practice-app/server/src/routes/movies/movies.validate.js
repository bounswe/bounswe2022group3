const { query } = require("express-validator");
exports.validate = (method) => {
    switch (method) {
        case "results": {
            return [
                query("keyword", "keyword doesn't exist").exists(),
            ];
        }
        case "add": {
            return [
                query("title", "title doesn't exist").exists(),
                query("email", "email doesn't exist").exists(),
            ];
        }
        case "list": {
            return [
                query("email", "email doesn't exist").exists(),
            ];
        }
    }
};
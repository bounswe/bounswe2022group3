const { body } = require("express-validator");

exports.validate = (method) => {
    switch (method) {
        case "search_lyrics": {
            return [
                body("searchparameter", "no search parameter found").exists(),
            ];
        }
        case "save_lyrics": {
            return [
                body("lyrics_id","no id found or not numeric")
                    .exists()
                    .isNumeric(),
                body("full_title","no full_title information found")
                    .exists(),
                body("url","no url found")
                    .exists(),
            ];
        }
        case "saved_lyrics": {
            return [
            ];
        }
    }
};

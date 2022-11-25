const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createSpace": {
      return [
        body("name", "name does not exist").exists(),
        body("info", "info does not exist").exists(),
        body("tags", "tags do not exist").exists(),
        body("image", "image does not exist").exists(),
      ];
    }
  }
};
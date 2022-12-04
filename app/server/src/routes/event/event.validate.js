const { body, param } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create-event": {
      return [
        body("start_date", "start_date doesn't exist").exists(),
        body("start_date", "start_date is given in wrong format, should be a date").isISO8601().toDate(),
      ];
    }
    case "delete-event": {
      // not sure what to put here...
      return [];
    }
    case "participate": {
      // not sure what to put here...
      return [];
    }
    case "unparticipate": {
      // not sure what to put here...
      return [];
    }
    case "get-event": {
      // not sure what to put here...
      return [];
    }
    case "update-event": {
      // not sure what to put here...
      return [];
    }
  }
};

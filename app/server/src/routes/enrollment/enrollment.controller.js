const SpaceModel = require("../../models/space/space.model");
const EnrollmentModel = require("../../models/enrollment/enrollment.model");

const EnrollmentController = {
  createEnrollment: async function (req, res) {
    try {
      const space = req.body.space_id;
      const user = req.auth.id;
      const enrollment = await EnrollmentModel.createEnrollment(user, space);
      res.status(201).send({ enrollment });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  },

  getEnrolledSpaces: async function (req, res) {
    try {
      const user = req.auth.id;
      const enrolled_spaces = await EnrollmentModel.Enrollment.find({
        user,
      });
      var data = [];
      for (var enrolled_space of enrolled_spaces) {
        var space = await SpaceModel.Space.findById(enrolled_space.space)
          .populate("creator", "name surname")
          .populate({
            path: "topics",
            populate: {
              path: "topic_badge",
            },
          });
        if (space) {
          data.push(space);
        }
      }
      return res.status(200).json({ data });
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  },
};

module.exports = EnrollmentController;

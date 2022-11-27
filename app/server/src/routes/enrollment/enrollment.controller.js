const SpaceModel = require("../../models/space/space.model");
const EnrollmentModel = require("../../models/enrollment/enrollment.model");
const UserModel = require("../../models/user/user.model");

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

  searchEnrollments: async function (req, res) {
    try {
      const keyword = req.params.keyword;
      const user = req.auth.id;
      var enrollments = [];
      if (keyword) {
        spaces = await SpaceModel.Space.find(
          {
            name: { $regex: keyword, $options: "i" },
          },
          "name creator info rating tags image"
        )
          .populate("creator", "name surname")
          .exec();
        for (var space of spaces) {
          var enr = await EnrollmentModel.Enrollment.find(
            {
              space,
              user,
            },
            "space is_active notes progress"
          ).exec();
          if (enr) {
            enrollments.push(enr);
          }
        }
      } else {
        enrollments = await EnrollmentModel.Enrollment.find(
          { user },
          "space is_active notes progress"
        ).exec();
      }
      return res.status(200).json({ enrollments });
    } catch (error) {
      res.status(400).send({ error: error.toString() });
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
              path: "badge",
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

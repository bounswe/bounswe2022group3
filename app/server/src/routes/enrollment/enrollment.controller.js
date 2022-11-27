const SpaceModel = require("../../models/space/space.model");
const EnrollmentModel = require("../../models/enrollment/enrollment.model");
const UserModel = require("../../models/user/user.model");

const EnrollmentController = {
  createEnrollment: async function (req, res) {
    try {
      const space_id = req.body.space_id;
      const user = req.auth.id;
      const space = await SpaceModel.Space.findById(space_id);
      if (!space) {
        return res.status(400).json({ error: "Space does not exist!" });
      }
      const enrolled_space = await EnrollmentModel.Enrollment.find({
        user,
        space: space_id,
      });
      console.log(enrolled_space)
      if (enrolled_space.length > 0) {
        return res.status(400).json({ error: "User already enrolled!" });
      }
      const enrollment = await EnrollmentModel.createEnrollment(user, space_id);
      space.enrollments.push(enrollment);
      space.save();
      return res.status(201).send({ enrollment });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
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
      return res.status(400).send({ error: error.toString() });
    }
  },

  getEnrolledSpaces: async function (req, res) {
    try {
      const keyword = req.params.keyword;
      const user = req.auth.id;
      var enrollments = [];
      if (keyword) {
        let spaces = await SpaceModel.Space.find(
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
            enrollments.push(space);
          }
        }
      }
      else {
        const enrolled_spaces = await EnrollmentModel.Enrollment.find({
          user,
        });
        for (var enrolled_space of enrolled_spaces) {
          var space = await SpaceModel.Space.find({
            _id: enrolled_space.space
          },
          "name creator info rating tags image"
          ).populate("creator", "name surname");
          if (space) {
            enrollments.push(space[0]);
          }
        }
      }
      return res.status(200).json({ enrollments });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },
};

module.exports = EnrollmentController;

const SpaceModel = require("../../models/space/space.model");
const EnrollmentModel = require("../../models/enrollment/enrollment.model");
const UserModel = require("../../models/user/user.model");

const SpaceController = {
  createSpace: async function (req, res) {
    try {
      const user_id = req.auth.id;
      const creator = await UserModel.User.findById(user_id);
      const { name, info, tags, image } = req.body;
      var space = await SpaceModel.createSpace(
        name,
        creator,
        info,
        tags,
        image
      );
      res.status(201).send({ space });
    } catch (error) {
      res.status(400).send({ error: error.toString() });
    }
  },

  searchSpaces: async function (req, res) {
    try {
      const keyword = req.params.keyword;
      var spaces;
      if (keyword) {
        spaces = await SpaceModel.Space.find(
          {
            name: { $regex: keyword, $options: "i" },
          },
          "name creator info rating tags image"
        )
          .populate("creator", "name surname")
          .exec();
      } else {
        spaces = await SpaceModel.Space.find(
          {},
          "name creator info rating tags image"
        )
          .populate("creator", "name surname")
          .exec();
      }
      return res.status(200).json({ spaces });
    } catch (error) {
      res.status(400).send({ error: error.toString() });
    }
  },

  getSpaceDetail: async function (req, res) {
    try {
      var space = req.params.id;
      space = await SpaceModel.Space.findById(space, "-enrollments")
        .populate("creator", "name surname")
        .populate({
          path: "topics",
          populate: {
            path: "badge",
          },
        })
        .exec();

      if (!space) {
        return res.status(404).json({ message: "The space does not exist!" }); // The token exists but email mismatch.
      }
      let data = { space };
      // if user logged-in
      if (req.auth) {
        var user = req.auth.id;
        user = await UserModel.User.findById(user);
        if (!user) {
          return res.status(200).json({ data });
        }
        const enrollingInfo = await EnrollmentModel.Enrollment.findOne({
          space,
          user,
        });
        if (enrollingInfo) {
          data.enrolled = true;
        } else {
          data.enrolled = false;
        }
      } else {
        data.enrolled = false; // no
      }
      return res.status(200).json({ data });
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  },
};

module.exports = SpaceController;
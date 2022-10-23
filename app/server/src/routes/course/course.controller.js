const CourseModel = require("../../models/course/course.model");

const CourseController = {
  createCourse: async function (req, res) {
    const { name, lecturer_id, info, chapters, tags } = req.body;
    const course = await CourseModel.createCourse(
      name,
      lecturer_id,
      info,
      chapters,
      tags
    );
    res.status(201).send({ course });
  },

  getCourses: async function (req, res) {
    const { keyword } = req.body;
    const courses = await CourseModel.find({
      name: { $regex: keyword, $options: "i" },
    })
      .populate("name rating image lecturer")
      .populate({ path: "lecturer" });
    return res.status(200).json({ courses });
  },

  getCourseDetail: async function (req, res) {
    const { id } = req.body;
    const course = await CourseModel.findOne({ id })
      .populate("name info rating lecturer tags chapters image")
      .populate({ path: "lecturer" })
      .populate({ path: "chapters", populate: { path: "name" } });
    const user = req.auth;

    var data = {
      course,
      enrolled: user.enrolled,
    };
    return res.status(200).json({ data });
  },
};

module.exports = CourseController;

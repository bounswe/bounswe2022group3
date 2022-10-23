const CourseModel = require("../../models/course/course.model");
const EnrollmentModel = require("../../models/enrollment/enrollment.model");

const CourseController = {
  createCourse: async function (req, res) {
    try {
      const { name, lecturer_id, info, chapters, tags, image } = req.body;
      const course = await CourseModel.createCourse(
        name,
        lecturer_id,
        info,
        chapters,
        tags,
        image
      );
      res.status(201).send({ course });
    }
    catch (e) {
      res.status(400).send({ "error": e })
    }
  },

  getCourses: async function (req, res) {
    try {
      const keyword = req.params.keyword
      const courses = await CourseModel.find({
        name: { $regex: keyword, $options: "i" },
      }).populate("name rating image lecturer");
      return res.status(200).json({ courses });
    }
    catch (e) {
      res.status(400).send({ "error": e })
    }
  },

  getCourseDetail: async function (req, res) {
    try {
      const id = req.params.id
      const course = await CourseModel.findById(id)
        .populate("name info rating lecturer tags chapters image")
        .exec();
      const user = req.auth;

      let data = {
        course,
      };
      const enrollingInfo = await EnrollmentModel.find({ course_id: id, user_id: user._id })
      if (enrollingInfo) {
        data.enrolled = true
      } else {
        data.enrolled = false
      }
      return res.status(200).json({ data });
    }
    catch (e) {
      res.status(400).send({ "error": e })
    }
  },
};

module.exports = CourseController;

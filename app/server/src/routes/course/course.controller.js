const CourseModel = require("../../models/course/course.model");
const EnrollmentModel = require("../../models/enrollment/enrollment.model");

const CourseController = {
  createCourse: async function (req, res) {
    try {
      const { name, info, chapters, tags, image } = req.body;
      const course = await CourseModel.createCourse(
        name,
        info,
        chapters,
        tags,
        image
      );
      res.status(201).send({ course });
    } catch (error) {
      res.status(400).send({ error: error.toString() });
    }
  },

  getCourses: async function (req, res) {
    try {
      const keyword = req.params.keyword;
      var courses;
      if (keyword) {
        courses = await CourseModel.Course.find({
          name: { $regex: keyword, $options: "i" },
        })
          .populate("name rating image lecturer")
          .exec();
      } else {
        courses = await CourseModel.Course.find({})
          .populate("name rating image lecturer")
          .exec();
      }
      return res.status(200).json({ courses });
    } catch (error) {
      res.status(400).send({ error: error.toString() });
    }
  },

  getCourseDetail: async function (req, res) {
    try {
      const id = req.params.id;
      const course = await CourseModel.Course.findById(id)
        .populate("name info rating lecturer tags chapters image")
        .exec();
      const user = req.auth;

      let data = {
        course,
      };
      const enrollingInfo = await EnrollmentModel.Enrollment.find({
        course_id: id,
        user_id: user._id,
      });
      if (enrollingInfo) {
        data.enrolled = true;
      } else {
        data.enrolled = false;
      }
      return res.status(200).json({ data });
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  },
};

module.exports = CourseController;

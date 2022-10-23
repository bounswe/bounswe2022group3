const CourseModel = require("../../models/course/course.model");
const EnrollmentModel = require("../../models/enrollment/enrollment.model");

const CourseController = {
  createCourse: async function (req, res) {
    const {
      course_name,
      lecturer_id,
      course_info,
      course_chapters,
      course_tags,
    } = req.body;
    const course = await CourseModel.createCourse(
      course_name,
      lecturer_id,
      course_info,
      course_chapters,
      course_tags
    );
    res.status(201).send({ course });
  },

  getCourses: async function (req, res) {
    const { keyword } = req.body;
    const courses = await CourseModel.find({
      course_name: { $regex: keyword, $options: "i" },
    })
      .populate("name rating image lecturer")
      .populate({ path: "lecturer" });
    return res.status(200).json({ courses });
  },

  createEnrollment: async function (req, res) {
    const { user_id, course_id } = req.body;
    const course = await EnrollmentModel.createEnrollment(user_id, course_id);
    res.status(201).send({ course });
  },

  getEnrolledCourses: async function (req, res) {
    const user = req.auth; // what does req.auth return?
    const enrolled_courses = await EnrollmentModel.find({ user_id: user.id });
    var data = [];
    for (var enrolled_course of enrolled_courses) {
      var course = await CourseModel.findOne({
        course_id: enrolled_course.course_id,
      }).populate("course_id course_name course_image");
      data.push(course);
    }
    return res.status(200).json({ data });
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

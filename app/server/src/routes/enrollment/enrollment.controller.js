const CourseModel = require("../../models/course/course.model");
const EnrollmentModel = require("../../models/enrollment/enrollment.model");

const EnrollmentController = {
  createEnrollment: async function (req, res) {
    const { user_id, course_id } = req.body;
    const enrollment = await EnrollmentModel.createEnrollment(
      user_id,
      course_id
    );
    res.status(201).send({ enrollment });
  },

  getEnrolledCourses: async function (req, res) {
    const user = req.auth;
    const enrolled_courses = await EnrollmentModel.find({ user_id: user.id });
    var data = [];
    for (var enrolled_course of enrolled_courses) {
      var course = await CourseModel.findOne({
        course_id: enrolled_course.course_id,
      }).populate("name image");
      data.push(course);
    }
    return res.status(200).json({ data });
  },
};

module.exports = EnrollmentController;

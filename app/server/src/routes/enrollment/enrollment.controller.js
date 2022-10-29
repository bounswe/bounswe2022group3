const CourseModel = require("../../models/course/course.model");
const EnrollmentModel = require("../../models/enrollment/enrollment.model");

const EnrollmentController = {
  createEnrollment: async function (req, res) {

    try {
      const course_id = req.body.course_id;
      const user = req.auth;
      const enrollment = await EnrollmentModel.createEnrollment(
        user._id,
        course_id
      );
      res.status(201).send({ enrollment });
    }
    catch (e) {
      res.status(400).send({ "error": e })
    }
  },

  getEnrolledCourses: async function (req, res) {

    try {
      const user = req.auth;
      const enrolled_courses = await EnrollmentModel.Enrollment.find({ user_id: user._id });
      var data = [];
      for (var enrolled_course of enrolled_courses) {
        var course = await CourseModel.Course.findById(enrolled_course.course_id)
        data.push(course);
      }
      return res.status(200).json({ data });
    }
    catch (e) {
      res.status(400).send({ "error": e.toString() })
    }
  },
};

module.exports = EnrollmentController;
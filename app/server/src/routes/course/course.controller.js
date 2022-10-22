const CourseModel = require("../../models/course/course.model");
const EnrollmentModel = require("../../models/enrollment/enrollment.model");
const ChapterModel = require("../../models/chapter/chapter.model");

const CourseController = {
  getCourses: async function (req, res) {
    const courses = await CourseModel.find({});
    const keyword = req.keyword;
    var return_l = [];
    for (var course of courses) {
      if (course.course_name.toLowerCase().includes(keyword)) {
        var lecturer = await UserModel.findOne({ user_id: course.lecturer_id });
        return_l.push({
          id: course.course_id,
          title: course.course_name,
          rating: course.course_rating,
          image: course.course_image,
          lecturer: { id: lecturer.user_id, name: lecturer.user_name },
        });
      }
    }
    return res.status(200).json({ return_l });
  },

  getEnrolledCourses: async function (req, res) {
    const user = req.auth; // what does req.auth return?
    const enrolled_courses = await EnrollmentModel.find({ user_id: user.id });
    var return_l = [];
    for (var enrolled_course of enrolled_courses) {
      var course = await CourseModel.findOne({
        course_id: enrolled_course.course_id,
      });
      return_l.push({
        id: course.course_id,
        title: course.course_name,
        image: course.course_image,
      });
    }
    return res.status(200).json({ return_l });
  },

  getCourseDetail: async function (req, res) {
    const course = await CourseModel.findOne({ course_id: req.id });
    const lecturer = await UserModel.findOne({ user_id: course.lecturer_id });
    const user = req.auth;

    var return_d = {
      id: course.course_id,
      title: course.course_name,
      course_info: course.course_info,
      rating: course.course_rating,
      lecturer: {
        id: lecturer.user_id,
        name: lecturer.user_name,
        email: lecturer.user_email,
        is_confirmed: lecturer.is_confirmed,
        image: lecturer.user_image, // user_image doesn't exist in Class Diagram
      },
      tags: course.course_tags,
      chapters: [],
      image: course.course_image,
      enrolled: user.enrolled,
    };
    for (var chapter_id of course.course_chapters) {
      var chapter = await ChapterModel.findOne({ chapter_id });
      return_d.chapters.push({ id: chapter.chapter_id, chapter_name: chapter.chapter_name });
    }
    return res.status(200).json({ return_d });
  },
};

module.exports = CourseController;

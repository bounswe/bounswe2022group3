const mongoose = require("mongoose");
const crypto = require("crypto");

const courseSchema = new mongoose.Schema({
  course_id: {
    unique: true,
    type: String,
    required: true,
  },
  course_name: {
    type: String,
  },
  lecturer_id: {
    type: String,
    required: true,
  },
  course_info: {
    type: String,
  },
  course_rating: {
    type: Number,
  },
  course_chapters: {
    type: [String],
  },
  course_tags: {
    type: [String],
  },
  course_badges: {
    type: [String],
  },
  course_feedback: {
    type: [String],
  },
  event_list: {
    type: [String],
  },
  discussion_list: {
    type: [String],
  },
  poll_list: {
    type: [String],
  },
  enrollments: {
    type: [String],
  },
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  // randomUUID not necessary, use mongodb ID
  var course = new Course({ }); // lecturer_id required
  course.course_id = course._id;
  const res = await course.save();
  return res;
};

const deleteCourse = async (course_id) => {
  const res = await Course.findOneAndDelete({ course_id });
  return res;
};

module.exports = { Course, createCourse, deleteCourse };

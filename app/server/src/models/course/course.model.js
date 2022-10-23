const mongoose = require("mongoose");

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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course_info: {
    type: String,
  },
  course_rating: {
    type: Number,
  },
  course_chapters: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Chapter",
  },
  course_tags: {
    type: [String],
  },
  course_badges: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Badge",
  },
  course_feedback: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Feedback",
  },
  event_list: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Event",
  },
  discussion_list: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Discussion",
  },
  poll_list: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Poll",
  },
  enrollments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Enrollment",
  },
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async (
  course_name,
  lecturer_id,
  course_info,
  course_chapters,
  course_tags,
  course_badges
) => {
  var course = new Course({
    course_name,
    lecturer_id,
    course_info,
    course_chapters,
    course_tags,
    course_badges,
  });
  course.course_id = course._id;
  const res = await course.save();
  return res;
};

const deleteCourse = async (course_id) => {
  const res = await Course.findOneAndDelete({ course_id });
  return res;
};

module.exports = { Course, createCourse, deleteCourse };

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  info: {
    type: String,
  },
  rating: {
    type: Number,
  },
  chapters: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Chapter",
  },
  tags: {
    type: [String],
  },
  badges: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Badge",
  },
  feedback: {
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

const createCourse = async (name, lecturer, info, chapters, tags) => {
  var course = new Course({
    name,
    lecturer,
    info,
    chapters,
    tags,
  });
  const res = await course.save();
  return res;
};

const deleteCourse = async (_id) => {
  const res = await Course.findOneAndDelete({ _id });
  return res;
};

module.exports = { Course, createCourse, deleteCourse };

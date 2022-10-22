const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    course_id: {
        unique: true,
        type: String,
    },
    course_name: {
        type: String
    },
    lecturer_id: {
        unique: true,
        type: String
    },
    course_info: {
        type: String
    },
    course_rating: {
        type: Number
    },
    course_chapters: {
        type: [String]
    },
    course_tags: {
        type: [String]
    },
    course_badges: {
        type: [String]
    },
    course_feedback: {
        type: [String]
    },
    event_list: {
        type: [String]
    },
    discussion_list: {
        type: [String]
    },
    poll_list: {
        type: [String]
    },
    enrollments: {
        type: [String]
    }
});

const Course = mongoose.model('Course', courseSchema);

const createCourse = async (course_id) => {
    var course = new Course({ course_id })
    const res = await course.save()
    return res
}

const deleteCourse = async (course_id) => {
    const res = await Course.findOneAndDelete({ course_id })
    return res
}

module.exports = { Course, createCourse, deleteCourse };

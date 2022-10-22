const CourseModel = require("../../models/course/course.model");
const EnrollmentModel = require("../../models/enrollment/enrollment.model");

const CourseController = {

    getCourses: async function (req, res) {
        res.send({ "status": "OK" })
    },
    
    getEnrolledCourses: async function (req, res) {
        res.send({ "status": "OK" })
    },
    
    getCourseDetail: async function (req, res) {
        res.send({ "status": "OK" })
    }
    
};

module.exports = CourseController;
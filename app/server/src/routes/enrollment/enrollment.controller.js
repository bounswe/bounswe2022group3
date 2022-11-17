const CourseModel = require("../../models/course/course.model");
const EnrollmentModel = require("../../models/enrollment/enrollment.model");

const EnrollmentController = {
	createEnrollment: async function (req, res) {

		try {
			const course_id = req.body.course_id;
			const course = CourseModel.getCourseByID(course_id);
			if (!course) {
				return res
					.status(400)
					.json({ message: "The course does not exist." });
			}
			const user_id = req.auth.id;
			// check if enrollment already exist? or create enrollment doesn't operate if enrollment exists?
			const enrollment = await EnrollmentModel.createEnrollment(
				user_id,
				course_id,
				course.name
			);
			res.status(201).send({ enrollment });
		}
		catch (e) {
			res.status(400).send({ "error": e })
		}
	},

	deleteEnrollment: async function (req, res) {
		//TODO: needs debugging after PR merge of @Furkan and @Kadir
		const { course_id } = req.body
		user = req.auth
		try {
			const user_id = req.auth.id;
			const response = await EnrollmentModel.deleteEnrollment(user_id, course_id);
			if (!response) {
				return res
					.status(400)
					.json({ message: "The enrollment could not be found." });
			}
			res.status(200).send(response);
		}
		catch (e) {
			res.status(400).send({ "error": e })
		}
	},

	getEnrollment: async function (req, res) {
		//TODO: needs debugging after PR merge of @Furkan and @Kadir
		const course_id = req.params.course_id;
		user = req.auth
		try {
			const user_id = req.auth.id;
			const course = CourseModel.getCourseByID(course_id);
			if (!course) {
				return res
					.status(400)
					.json({ message: "The course does not exist." });
			}
			const response = await EnrollmentModel.getEnrollment(user_id, course_id);
			if (!response) {
				return res
					.status(400)
					.json({ message: "The enrollment could not be found." });
			}
			res.status(200).send(response);
		}
		catch (e) {
			res.status(400).send({ "error": e })
		}
	},

	getEnrolledCourses: async function (req, res) {
		//TODO: needs debugging after PR merge of @Furkan and @Kadir
		// I have deleted chapter population of courses, Do we need chapter data on get enrolled courses endpoint?
		try {
			const user_id = req.auth.id;
			var enrollments;
			if (keyword) {
				enrolled_courses = await EnrollmentModel.Enrollment.find({
					course_name: { $regex: keyword, $options: "i" },
				}, 'user_id course course_id course_name is_active')
				  .populate("course", 'name lecturer rating tags')
				  .populate("lecturer", 'name surname')
				  .exec();
			  } else {
				courses = await CourseModel.Course.find({},	'user_id course course_id course_name is_active')
				  .populate("course", 'name lecturer rating tags')
				  .populate("lecturer", 'name surname')
				  .exec(); 
			  }
			return res.status(200).json({ enrollments });
		}
		catch (e) {
			res.status(400).send({ "error": e.toString() })
		}
	},
};

module.exports = EnrollmentController;
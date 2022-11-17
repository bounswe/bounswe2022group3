const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    course_id: {// This is probably not necessary, delete and clean up controller from it!!!
      type: String,
    },
    course_name: {
      type: String,
    },
    is_active: {
      type: Boolean,
    },
    notes: {
      // type: [mongoose.Schema.Types.ObjectId],
      // ref: "Note",
      type: String,
    },
    progress: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

const createEnrollment = async (user_id, course_id, course_name) => {
  var enrollment = new Enrollment({ user_id, course_id });
  enrollment.is_active = true;
  enrollment.course_name = course_name;
  const res = await enrollment.save();
  return res;
};

const deleteEnrollment = async (user_id, course_id) => {
  const enrollment = await Enrollment.findOne({ user_id, course_id  });
  enrollment.is_active = false
  return res;
};

const getEnrollment = async (user_id, course_id) => {

  const result = await Enrollment.findOne({user_id, course_id}).exec();
  return result;
}

module.exports = { Enrollment, createEnrollment, deleteEnrollment, getEnrollment };

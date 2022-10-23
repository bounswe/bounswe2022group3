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
    is_active: {
      type: Boolean,
    },
    notes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Note",
    },
    progress: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

const createEnrollment = async (user_id, course_id) => {
  var enrollment = new Enrollment({ user_id, course_id });
  const res = await enrollment.save();
  return res;
};

const deleteEnrollment = async (_id) => {
  const res = await Enrollment.findOneAndDelete({ _id });
  return res;
};

module.exports = { Enrollment, createEnrollment, deleteEnrollment };

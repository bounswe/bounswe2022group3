const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  enrollment_id: {
    unique: true,
    type: String,
  },
  user_id: {
    type: String,
  },
  course_id: {
    type: String,
  },
  created_at: {
    type: Date,
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
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

const createEnrollment = async (user_id, course_id) => {
  var enrollment = new Enrollment({ user_id, course_id });
  enrollment.enrollment_id = enrollment._id;
  enrollment.created_at = Date.now();
  const res = await enrollment.save();
  return res;
};

const deleteEnrollment = async (enrollment_id) => {
  const res = await Enrollment.findOneAndDelete({ enrollment_id });
  return res;
};

module.exports = { Enrollment, createEnrollment, deleteEnrollment };

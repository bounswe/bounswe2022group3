const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    space: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
      required: true,
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
enrollmentSchema.index({ user: 1, space: 1 }, { unique: true });

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

const createEnrollment = async (user_id, space_id) => {
  var enrollment = new Enrollment({ user: user_id, space: space_id });
  const res = await enrollment.save();
  return res;
};

const deleteEnrollment = async (_id) => {
  const res = await Enrollment.findOneAndDelete({ _id });
  return res;
};

module.exports = { Enrollment, createEnrollment, deleteEnrollment };

const mongoose = require("mongoose");
const SpaceModel = require("../space/space.model");
const UserModel = require("../user/user.model");
const NoteModel = require("../note/note.model");

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
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
    progress: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);
enrollmentSchema.index({ user: 1, space: 1 }, { unique: true });

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

const createEnrollment = async (user, space_id) => {
  var enrollment = new Enrollment({ user, space: space_id });
  enrollment.is_active = true;

  const creator = await UserModel.getUserByID(user);
  creator.enrollments.push(enrollment);
  await creator.save();
  const res = await enrollment.save();
  return res;
};

const deleteEnrollment = async (id) => {
  var enrollment = await Enrollment.findById(id);
  for (var note_temp of enrollment.notes) {
    await NoteModel.deleteNote(note_temp);
  }
  enrollment.remove();
};
const getEnrollmentByID = async (enrollment_id) => {
  const result = await Enrollment.findById(enrollment_id).exec();
  return result;
};
const getEnrollment = async (user_id, space_id) => {
  const result = await Enrollment.find(
    {
      user: user_id,
      space: space_id
    })
    .populate("user", "name surname")
    .populate({
      path: "notes",
      options: { sort: { createdAt: -1 } },
      select: { _id: 1, title: 1, body: 1 }
    })
    .exec();
  return result;
};
const getEnrollmentNoteExtended = async (user_id, space_id) => {
  const result = await Enrollment.find(
    {
      user: user_id,
      space: space_id
    })
    .populate("user", "name surname")
    .populate({
      path: "notes",
      options: { sort: { createdAt: -1 } },
      select: { _id: 1, title: 1, body: 1, resource: 1 }
    })
    .exec();
  return result;
};



module.exports = { Enrollment, createEnrollment, deleteEnrollment, getEnrollment, getEnrollmentByID, getEnrollmentNoteExtended };

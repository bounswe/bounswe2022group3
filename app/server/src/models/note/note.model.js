const mongoose = require("mongoose");


const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    space: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

const createNote = async (title, body, space, creator) => {
  var note = new Note({
    title,
    body,
    space,
    creator,
  });
  const res = await note.save();
  return res;
};

const getNote = async (id) => {
  var note = await Note.findById(id);
  return note;
};

const getPopulatedNote = async (id) => {
  return Note.findById(id)
    .populate("creator", "name surname")
    .populate({
      path: "space",
      select: { _id: 1, name: 1 }
    })
    .exec();
};

module.exports = {
    Note,
  getNote,
  createNote,
  getPopulatedNote
};

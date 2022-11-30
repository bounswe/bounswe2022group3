const NoteModel = require("../../models/note/note.model");
const SpaceModel = require("../../models/space/space.model");
const EnrollmentModel = require("../../models/enrollment/enrollment.model");

const NoteController = {
  createNote: async function (req, res) {
    try {
      const { title, body, space_id } = req.body;
      const user_id = req.auth.id;
      const note = await NoteModel.createNote(
        title,
        body,
        space_id,
        user_id
      );
      var enrollment = await EnrollmentModel.getEnrollment(user_id, space_id)
      if (enrollment.length !== 1 ) {
        return res.status(400).json({ error: "Enrollment does not exist!" });
      }
      enrollment = enrollment[0];
      enrollment.notes.push(note);
      await enrollment.save();
      return res.status(201).json({ note });
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  },
  deleteNote: async function (req, res) {
    try {
      const { note_id } = req.body;
      const user = req.auth.id;
      const note = await NoteModel.getNote(note_id);
      if (!note) {
        return res.status(400).json({ error: "Note does not exist!" });
      }
      if (note.creator.toString() !== user.toString()) {
        return res.status(400).json({ error: "User not creator of note" });
      } else {
        note.remove();
      }
      return res.status(201).json({ message: "Note deleted successfully!" });
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  },
  getNote: async function (req, res) {
    try {
      const user = req.auth.id;
      const note = await NoteModel.getPopulatedNote(req.params.id);
      if (!note) {
        return res.status(400).json({ error: "Note does not exist!" });
      }
      if (note.creator._id.toString() !== user.toString()) {
        return res
          .status(400)
          .send({ error: "User not the creator of the note!" });
      }
      return res.status(200).json({ note });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },
  updateNote: async function (req, res) {
    try {
      const { note_id } = req.body;
      const user = req.auth.id;
      var note = await NoteModel.getNote(note_id);
      if (!note) {
        return res.status(400).json({ error: "Note does not exist!" });
      }
      if (note.creator.toString() !== user.toString()) {
        return res
          .status(400)
          .send({ error: "User not the creator of the note!" });
      }
      const body_keys = Object.keys(req.body);
      if ((!body_keys.includes('title')) && (!body_keys.includes('body'))) {
        return res
          .status(400)
          .send({ error: "title or body not provided." });
      }
      if (body_keys.includes('title')) {
        note.title = req.body.title;
      }
      if (body_keys.includes('body')) {
        note.body = req.body.body;
      }
      await note.save();
      return res.status(200).json({ note });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },
  getNoteList: async function (req, res) {
    try {
      const user = req.auth.id;
      var enrollment = await EnrollmentModel.getEnrollment(user, req.params.space_id)
      console.log(enrollment)
      if (enrollment.length !== 1 ) {
        return res.status(400).json({ error: "Enrollment does not exist!" });
      }
      enrollment = enrollment[0];
      let notes = enrollment.notes;
      return res.status(200).json({ user: enrollment.user, notes: enrollment.notes });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },
};

module.exports = NoteController;

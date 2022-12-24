const NoteModel = require("../../models/note/note.model");
const SpaceModel = require("../../models/space/space.model");
const TopicModel = require("../../models/topic/topic.model");
const ResourceModel = require("../../models/resource/resource.model");
const EnrollmentModel = require("../../models/enrollment/enrollment.model");

const NoteController = {
  createNote: async function (req, res) {
    try {
      const { title, body, resource_id } = req.body;
      const user_id = req.auth.id;
      var resource = await ResourceModel.Resource.findById(resource_id);
      if(!resource){
        return res.status(400).json({ error: "Resource does not exist!" });
      }
      var topic = await TopicModel.Topic.findById(resource.topic);
      var space = await SpaceModel.Space.findById(topic.space);
      if(!space){
        return res.status(400).json({ error: "Space does not exist!" });
      }
      const note = await NoteModel.createNote(
        title,
        body,
        user_id,
        resource_id,
        space._id
      );
      var enrollment = await EnrollmentModel.getEnrollment(user_id, space._id)
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
        var enrollment = await EnrollmentModel.Enrollment.find(
          {
            user: note.creator,
            space: note.space
          }).exec();
        enrollment = enrollment[0];
        const index = enrollment.notes.indexOf(note_id);
        if (index > -1) { // only splice array when item is found
          enrollment.notes.splice(index, 1); // 2nd parameter means remove one item only
        }
        await enrollment.save();
        note.remove();
      }
      return res.status(201).json({ message: "Note deleted successfully!" });
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  },
  getNote: async function (req, res) {
    try {
      //const user = req.auth.id;
      const note = await NoteModel.getPopulatedNote(req.params.id);
      if (!note) {
        return res.status(400).json({ error: "Note does not exist!" });
      }
      // if (note.creator._id.toString() !== user.toString()) {
      //   return res
      //     .status(400)
      //     .send({ error: "User not the creator of the note!" });
      // }
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
      var enrollment = await EnrollmentModel.getEnrollmentNoteExtended(user, req.body.space_id)
      if (enrollment.length !== 1 ) {
        return res.status(400).json({ error: "Enrollment does not exist!" });
      }
      enrollment = enrollment[0];
      let notes = [];
      const body_keys = Object.keys(req.body);
      if ((!body_keys.includes('resource_id')) && (!body_keys.includes('topic_id'))) {
        // no filter
        //notes = enrollment.notes;
        for(var note of enrollment.notes){
          var resource = await ResourceModel.Resource.findById(note.resource);
          var topic = await TopicModel.Topic.findById(resource.topic);
          var topic_ = {name: topic.name, id: topic._id}
          notes.push({note, resource_name: resource.name, topic:topic_})
        }
      }
      // filter by resource if resource exists, filter by topic if topic exists
      // if both exist, filter by resource.
      if (body_keys.includes('resource_id')) {
        let resource_id = req.body.resource_id;
        for(var note of enrollment.notes){
          var resource = await ResourceModel.Resource.findById(note.resource);
          var topic = await TopicModel.Topic.findById(resource.topic);
          var topic_ = {name: topic.name, id: topic._id}
          if(note.resource.toString() == resource_id.toString()){
            notes.push({note, resource_name: resource.name, topic:topic_})
          }
        }
      }
      else if (body_keys.includes('topic_id')) {
        let topic_id = req.body.topic_id;
        for(var note of enrollment.notes){
          var resource = await ResourceModel.Resource.findById(note.resource);
          var topic = await TopicModel.Topic.findById(resource.topic);
          var topic_ = {name: topic.name, id: topic._id}
          if(resource.topic.toString() == topic_id.toString()){
            notes.push({note, resource_name: resource.name, topic:topic_})
          }
        }
      }
      return res.status(200).json({ user: enrollment.user, notes });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },
};

module.exports = NoteController;

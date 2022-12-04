const AnnotationModel = require("../../models/annotation/annotation.model");
const { Resource } = require("../../models/resource/resource.model");
const { Body } = require("../../models/annotation/body.model");
const { Selector } = require("../../models/annotation/selector.model");

const AnnotationController = {
  createAnnotation: async function (req, res) {
    try {
      const { type, body, target, id, resource } = req.body;
      const context = req.body["@context"];
      var annotation = await AnnotationModel.createAnnotation(
        context,
        type,
        body,
        target,
        id,
        resource
      );
      return res.status(201).json({ annotation });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },
  getAnnotation: async function (req, res) {
    try {
      const { id } = req.params;
      const annotation = await AnnotationModel.Annotation.findOne({ id }, "-_id -__v").exec();
      if (!annotation) {
        return res
          .status(404)
          .json({ message: "The annotation does not exist!" });
      }
      return res.status(200).json({ annotation });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },
  getResourceAnnotations: async function (req, res) {
    try {
      const { resource_id } = req.params;
      const resource = await Resource.findById(resource_id);
      if (!resource) {
        return res.status(400).json({ error: "Resource does not exist!" });
      } else {
        const annotations = await AnnotationModel.Annotation.find({ resource: resource_id }, "-_id -__v").exec();
        return res.status(200).json({ annotations });
      }
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },
  updateAnnotation: async function (req, res) {
    try {
      const { id, body } = req.body;
      const user = req.auth.id;
      const annotation = await AnnotationModel.Annotation.findOne({ id });
      if (!annotation) {
        return res.status(400).json({ error: "Annotation does not exist!" });
      }
      let els = body[0].creator.id.split('/');
      let user_id = els[els.length - 1];
      if (user_id !== user.toString()) {
        return res
          .status(400)
          .json({ error: "User not the creator of annotation!" });
      } else {
        annotation.body = body;
        annotation.save();
        return res
          .status(201)
          .json({ message: "Annotation updated successfully!" });
      }
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },
  deleteAnnotation: async function (req, res) {
    try {
      const { id } = req.body;
      const user = req.auth.id;
      const annotation = await AnnotationModel.Annotation.findOne({ id });
      if (!annotation) {
        return res.status(400).json({ error: "Annotation does not exist!" });
      }
      let els = annotation.body[0].creator.id.split('/');
      let user_id = els[els.length - 1];
      if (user_id !== user.toString()) {
        return res
          .status(400)
          .json({ error: "User not the creator of annotation!" });
      } else {
        annotation.remove();
        return res
          .status(201)
          .json({ message: "Annotation deleted successfully!" });
      }
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },
};

module.exports = AnnotationController;

const AnnotationModel = require("../../models/annotation/annotation.model");
const { Resource } = require("../../models/resource/resource.model");
const { Body } = require("../../models/annotation/body.model");
const { Selector } = require("../../models/annotation/selector.model");

const AnnotationController = {
  createAnnotation: async function (req, res) {
    try {
      const { context, type, body, target, id, resource } = req.body;
      const annotation = await AnnotationModel.createAnnotation(
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
      const annotation = await AnnotationModel.Annotation.findOne({
        id,
      })
        .populate({
          path: "body",
          populate: { path: "creator", select: { name: 1 } },
        })
        .populate({
          path: "target",
          populate: {
            path: "selector",
            model: Selector,
          },
        })
        .exec();
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
      const resource = await Resource.findOne({
        id: resource_id,
      });
      if (!resource) {
        return res.status(400).json({ error: "Resource does not exist!" });
      } else {
        const annotations = await AnnotationModel.Annotation.find({
          resource,
        })
          .populate({
            path: "body",
            options: { sort: { created: -1 } }, // not sorting
            populate: { path: "creator", select: { name: 1 } },
          })
          .populate({
            path: "target",
            populate: {
              path: "selector",
              model: Selector,
            },
          })
          .exec();
        if (annotations == []) {
          return res
            .status(404)
            .json({ message: "No annotation exists for this resource!" });
        }
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
      const annotation = await AnnotationModel.Annotation.findOne({id});
      if (!annotation) {
        return res.status(400).json({ error: "Annotation does not exist!" });
      }
      const body_el = await Body.findById(annotation.body[0].toString());
      if (body_el.creator.toString() !== user.toString()) {
        return res
          .status(400)
          .json({ error: "User not the creator of annotation!" });
      } else {
        let fields = ['purpose', 'type', 'value', 'created'];
        for (var field of fields) {
          body_el[field] = body[0][field];
        }
        body_el.save();
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
      const body = await Body.findById(annotation.body[0].toString());
      if (body.creator.toString() !== user.toString()) {
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
